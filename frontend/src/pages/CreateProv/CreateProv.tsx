import React, { useEffect, useState } from "react";
import Nav from "../../components/Landing/Nav";
import { LANDING_IMG } from "../../assets/images";
import { Button } from "../../components/Common/Button";
import { OverlayDialog } from "../../components/OverlayDialog";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../redux/useRedux";
import { saveDocument } from "../../redux/reducers/documentSlice";
import Stepper from "../../components/CreateProv/Stepper";
import AddEntityNew from "../../components/CreateProv/AddEntityNew";
import AddActivityNew from "../../components/CreateProv/AddActivityNew";
import AddAgentNew from "../../components/CreateProv/AddAgentNew";

export default function CreateProv() {
  const [isOverlayOpen, setIsOverlayOpen] = useState(true);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const document = useAppSelector((state) => state.doc);
  const currentStep = useAppSelector((state) => state.step.currentStep);

  const handleCloseOverlay = () => {
    setIsOverlayOpen(false);
    navigate(-1);
  };

  const handleSave = (data: {
    documentName: string;
    author: string;
    isPublic: boolean;
  }) => {
    dispatch(saveDocument(data));
    setIsOverlayOpen(false);
  };

  useEffect(() => {
    // Check if document data already exists in the store
    if (document.documentName === "" || document.author === "") {
      setIsOverlayOpen(true); // Show overlay if no document data exists
    } else {
      setIsOverlayOpen(false);
    }
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
                      {document?.documentName.toUpperCase() /* || "PROV DOC" */}
                    </p>
                    <p className="text-sm text-gray-400">
                      {document?.author.toUpperCase() /* || "Interact-PROV" */}
                    </p>
                  </div>
                </div>
                <div>
                  <Stepper />
                </div>
              </div>
              <div className="px-10 pb-5">
                {currentStep === 0 ? (
                  <Button
                    text="Add New Entity"
                    rounded="rounded-full"
                    type="primary"
                    size="sm"
                  />
                ) : currentStep === 1 ? (
                  <Button
                    text="Add New Activity"
                    rounded="rounded-full"
                    type="primary"
                    size="sm"
                  />
                ) : currentStep === 2 ? (
                  <Button
                    text="Add New Agent"
                    rounded="rounded-full"
                    type="primary"
                    size="sm"
                  />
                ) : null}
              </div>
            </div>
            <div className="w-3/4 flex pb-5">
              {currentStep === 0 ? (
                <AddEntityNew /> //entity
              ) : currentStep === 1 ? (
                <AddActivityNew /> //activity
              ) : currentStep === 2 ? (
                <AddAgentNew /> //agent
              ) : currentStep === 3 ? (
                <AddActivityNew /> //relationship
              ) : null}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
