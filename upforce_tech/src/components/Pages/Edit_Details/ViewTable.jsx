import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { storeViewData } from "../../../actions/viewDataActions";
import { storeEditData } from "../../../actions/editDataActions";
import { FaEye, FaBoxOpen, FaPenSquare } from "react-icons/fa";
import DataTable from "react-data-table-component";
import api from "../../utils/api";
import "./style.scss";

const fetchDataFromApi = api.fetchDataFromApi;
const deleteUserFromApi = api.deleteUserFromApi;
const exportCsv=api.exportCsv;

const ViewTable = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [actionRowId, setActionRowId] = useState(null);
  const [loading,setLoading]=useState(false)

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true)
      const response = await fetchDataFromApi();
      const fetchedUsers = response.data.users;
      setLoading(false)
      setUsers(fetchedUsers);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  const deleteUser = async (id) => {
    try {
      setLoading(true)
      await deleteUserFromApi(id);
      setLoading(false)
      setUsers((prevUsers) => prevUsers.filter((user) => user._id !== id));
      alert(`User has been deleted from the DB`);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  const handleActionClick = (rowId) => {
    setActionRowId(rowId === actionRowId ? null : rowId);
  };

  const handleViewClick = (row) => {
    dispatch(storeViewData(row));
    navigate("/viewUser");
  };

  const handleEditClick = (row) => {
    dispatch(storeEditData(row));
    navigate("/editUser");
  };

  const handelExport=async()=>{
    try {
      setLoading(true)
      const response = await exportCsv();
      console.log(response)
      setLoading(false)
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  }

  const columns = [
    {
      name: "Id",
      selector: (row) => row._id,
    },
    {
      name: "FullName",
      selector: (row) => row.fullname,
      sortable: true,
    },
    {
      name: "Email",
      selector: (row) => row.email,
    },
    {
      name: "Gender",
      selector: (row) => row.gender,
      sortable: true,
    },
    {
      name: "Status",
      selector: (row) => row.status,
      sortable: true,
    },
    {
      name: "Profile",
      selector: (row) => <img width={50} src={row.profile} />,
    },
    {
      name: "Actions",
      selector: (row) => (
        <div className="actions" onClick={() => handleActionClick(row._id)}>
          <p>:</p>
          {actionRowId === row._id && (
            <div id="actionDiv">
              <div>
                <span className="greenColor">
                  <FaEye />
                </span>
                <p onClick={() => handleViewClick(row)}>View</p>
              </div>
              <div>
                <span className="blueColor">
                  <FaPenSquare />
                </span>
                <p onClick={() => handleEditClick(row)}>Edit</p>
              </div>
              <div onClick={() => deleteUser(row._id)}>
                <span className="redColor">
                  <FaBoxOpen />
                </span>
                <p>Delete</p>
              </div>
            </div>
          )}
        </div>
      ),
    },
  ];

  const customStyles = {
    headCells: {
      style: {
        fontSize: "17px",
        color: "white",
        backgroundColor: "black",
        zIndex: "1",
      },
    },
    cells: {
      style: {
        fontSize: "17px",
        fontWeight: "550",
      },
    },
  };

  return (
    <div id="parent_div">
      <h1 className="user_table_heading">User's Details Table</h1>
      <div className="search_Div">
        <div>
          <input type="text" placeholder="Enter Name to Search..." />
          <button>Search</button>
        </div>
        <div>
          <button onClick={()=>navigate('/addUser')}>Add User</button>
          <button onClick={()=>handelExport()} >Export to CSV</button>
        </div>
      </div>
      {loading ? (
        <h1 className="loading_Text">Loading... <br /> Please Wait</h1>
      ) : (
        <DataTable
          columns={columns}
          data={users}
          customStyles={customStyles}
          pagination
          fixedHeader
          fixedHeaderScrollHeight="450px"
          highlightOnHover
          style={{ zIndex: 1 }}
        />
      )}
    </div>
  );
};

export default ViewTable;
