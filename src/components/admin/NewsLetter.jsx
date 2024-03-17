import React, { useEffect, useState } from "react";
import "../admin/css/newsletter.css";
import { DataGrid } from "@mui/x-data-grid";
import { useNotification } from "../../hooks";
import { getNewsLetterDetails } from "../../api/admin";
import { Link } from "react-router-dom";
import Empty from "../user/Empty";

export default function NewsLetter() {
  const [newsLetters, setNewsLetters] = useState([]);

  const { updateNotification } = useNotification();

  const getNewsLetters = async () => {
    const { error, newsletters } = await getNewsLetterDetails();
    console.log(newsletters);
    if (error) return updateNotification("error", error);
    setNewsLetters([...newsletters]);
  };
  useEffect(() => {
    getNewsLetters();
    // eslint-disable-next-line
  }, []);

  const columns = [
    {
      field: "userId",
      headerName: "Username",
      renderCell: (
        params // Customize cell contents
      ) => <div className="font-semibold">{params.value.username}</div>,
    },
    {
      field: "email",
      headerName: "Email",
      renderCell: (
        params // Customize cell contents
      ) => <div className="font-semibold">{params.value}</div>,
    },
  ];
  return (
    <>
      <div className="newsletter">
        {newsLetters.length ? (
          <DataGrid
            rows={newsLetters}
            disableRowSelectionOnClick
            columns={columns.map((column) => ({
              ...column,
              flex: 1,
              renderHeader: (params) => (
                <div className="font-semibold tracking-wide capitalize">
                  {params.colDef.headerName}
                </div>
              ),
            }))}
            getRowId={(row) => row._id}
            pageSizeOptions={[5, 10, 20]}
          />
        ) : (
          <Empty emptyMessage="No Emails Registered Yet" />
        )}
      </div>
    </>
  );
}
