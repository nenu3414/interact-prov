import React, { useEffect, useState } from "react";
import Nav from "../../components/Landing/Nav";
import { LANDING_IMG } from "../../assets/images";
import { Button } from "../../components/Common/Button";
import { OverlayDialog } from "../../components/OverlayDialog";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../redux/useRedux";
import { saveDocument } from "../../redux/reducers/documentSlice";

export default function CreateProv() {
  const [isOverlayOpen, setIsOverlayOpen] = useState(true);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const document = useAppSelector((state) => state.doc);

  const handleCloseOverlay = () => {
    setIsOverlayOpen(false);
    navigate(-1);
  };

  const handleSave = (data: {
    documentName: string;
    author: string;
    isPublic: boolean;
  }) => {
    // console.log("Document saved:", data);
    dispatch(saveDocument(data));
    setIsOverlayOpen(false);
  };

  useEffect(() => {
    // Check if document data already exists in the store
    if (!document.documentName) {
      setIsOverlayOpen(true); // Show overlay if no document data exists
    }
    setIsOverlayOpen(false);
  }, [document]);

  useEffect(() => {
    const rDoc = sessionStorage.getItem("doc");
    if (rDoc) {
      const parsedDoc = JSON.parse(rDoc);
      dispatch(saveDocument(parsedDoc));
    }
  }, []);

  return (
    <>
      {isOverlayOpen && (
        <OverlayDialog
          isOpen={isOverlayOpen}
          onClose={handleCloseOverlay}
          onSave={handleSave}
        />
      )}
      {!isOverlayOpen && (
        <div className="w-full h-screen flex flex-col">
          <div>
            <Nav />
          </div>
          <div className="flex flex-grow mt-12">
            <div className="w-1/4 flex flex-col">
              <div className="flex-grow overflow-hidden px-10">
                <div className="flex items-center gap-3 my-5">
                  <img
                    src={LANDING_IMG}
                    alt=""
                    className="rounded-full h-10 w-10"
                  />
                  <div>
                    <p className="text-sm">
                      {document?.documentName.toUpperCase() || "PROV DOC"}
                    </p>
                    <p className="text-sm text-gray-400">
                      {document?.author.toUpperCase() || "Interact-PROV"}
                    </p>
                  </div>
                </div>
                <div className="flex flex-col gap-4">
                  <div className="flex items-center gap-2">
                    <p className="flex justify-center items-center w-5 h-5 rounded-full border-black border-solid border-[1px]">
                      1
                    </p>
                    <p className="font-medium">Adding Entity</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <p className="flex justify-center items-center w-5 h-5 rounded-full border-black border-solid border-[1px]">
                      2
                    </p>
                    <p className="font-medium">Adding Activity</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <p className="flex justify-center items-center w-5 h-5 rounded-full border-black border-solid border-[1px]">
                      3
                    </p>
                    <p className="font-medium">Adding Agent</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <p className="flex justify-center items-center w-5 h-5 rounded-full border-black border-solid border-[1px]">
                      4
                    </p>
                    <p className="font-medium">Define Relationship</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <p className="flex justify-center items-center w-5 h-5 rounded-full border-black border-solid border-[1px]">
                      5
                    </p>
                    <p className="font-medium">Visualize</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <p className="flex justify-center items-center w-5 h-5 rounded-full border-black border-solid border-[1px]">
                      6
                    </p>
                    <p className="font-medium">Export</p>
                  </div>
                </div>
              </div>
              <div className="px-10 pb-5">
                <Button
                  text="Add New Entity"
                  rounded="rounded-full"
                  type="primary"
                  size="sm"
                />
              </div>
            </div>
            <div className="w-3/4">2</div>
          </div>
        </div>
      )}
    </>
  );
}
