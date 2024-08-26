import React, { useEffect, useState } from "react";
import { RECENT_DOC } from "../../assets/images";
import provApi from "../../api/api";
import { LOADER } from "../../assets/icons";

export default function Section4() {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  function formatDate(inputDate: string | number | Date) {
    const date = new Date(inputDate);

    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();

    return `${day}/${month}/${year}`;
  }

  const handleViewClick = (uri: string | URL | undefined) => {
    // Open the URL in a new tab
    window.open(`${"https://openprovenance.org"}${uri}`, "_blank");
  };

  useEffect(() => {
    setLoading(true);
    provApi
      .getPublicDocs()
      .then((data) => {
        if (data.meta.total_count > 0) {
          setData(data.objects);
        }
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }, []);

  return (
    <div className="mt-16">
      <h1 className="text-5xl font-extrabold">Recent Documents</h1>
      {loading ? (
        <div className="w-full  h-[300px] flex items-center justify-center">
          <img src={LOADER} className="h-1/5" />
        </div>
      ) : (
        <>
          {data.map((item, i) => (
            <div
              className="flex justify-between items-center pt-8 m-auto"
              key={i}
            >
              <div className="flex gap-4">
                <div>
                  <img src={RECENT_DOC} alt="Recent Doc" />
                </div>
                <div className="flex flex-col justify-center">
                  <p className="font-medium text-black">{item.document_name}</p>
                  <p className="text-xs font-semibold text-gray-400">
                    {formatDate(item.created_at)}
                  </p>
                </div>
              </div>
              <div>
                <button
                  className="bg-gray-200 px-4 py-2 text-xs font-medium rounded-xl"
                  onClick={() => handleViewClick(item.resource_uri)}
                >
                  View
                </button>
              </div>
            </div>
          ))}
        </>
      )}
    </div>
  );
}
