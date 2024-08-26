import React, { useState } from "react";
import { Radio } from "../Common/Radio";
import { Button } from "../Common/Button";
import provApi from "../../api/api";
import { useAppDispatch, useAppSelector } from "../../redux/useRedux";
import { toast } from "react-toastify";
import { clearProv } from "../../redux/reducers/provSlice";
import { clearDoc } from "../../redux/reducers/documentSlice";
import { clearStep } from "../../redux/reducers/stepSlice";

export default function Export() {
  const dispatch = useAppDispatch();
  const [docFormat, setDocFormat] = useState("");
  const [downloaded, setDownloaded] = useState(false);
  const entities = useAppSelector((state: any) => state.prov.entities);
  const activities = useAppSelector((state: any) => state.prov.activities);
  const agents = useAppSelector((state: any) => state.prov.agents);
  const relationships = useAppSelector(
    (state: any) => state.prov.relationships
  );
  const documents = useAppSelector((state) => state.doc);

  const exportData = {
    entities,
    activities,
    agents,
    relationships,
    docFormat,
  };

  const handleStartNew = () => {
    setDocFormat("");
    setDownloaded(false);
    dispatch(clearProv());
    dispatch(clearDoc());
    dispatch(clearStep());
  };

  const handleExport = async () => {
    if (!docFormat) {
      alert("Please select a format");
      return;
    }

    try {
      const response = await provApi.exportProvDoc(exportData);
      const fileName = `${documents.documentName}.${
        docFormat === "provn"
          ? "provn"
          : docFormat.split("prov")[1].toLowerCase()
      }`;

      if (typeof response === "string") {
        const blob = new Blob([response], {
          type: "application/octet-stream",
        });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = fileName;
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
        document.body.removeChild(a);

        setDownloaded(true);
      } else {
        toast.error(`Unexpected response type: ${typeof response}`);
      }
    } catch (error) {
      console.error(`Error exporting document: ${error}`);
    }
  };

  return (
    <div className="w-full basis-[90%]">
      <h2 className="text-2xl font-semibold">Export Provenance Document</h2>
      <p className="text-lg mt-6 mb-3">Save as</p>
      <div className="flex flex-col gap-2">
        <Radio
          checked={docFormat === "provn"}
          onChange={(x: string) => x === "provn" && setDocFormat("provn")}
          value="provn"
          name="radio-buttons"
          label="Provn"
        />
        <Radio
          checked={docFormat === "provJson"}
          onChange={(x: string) => x === "provJson" && setDocFormat("provJson")}
          value="provJson"
          name="radio-buttons"
          label="Prov-JSON"
        />
        <Radio
          checked={docFormat === "provXml"}
          onChange={(x: string) => x === "provXml" && setDocFormat("provXml")}
          value="provXml"
          name="radio-buttons"
          label="Prov-XML"
        />
        <Radio
          checked={docFormat === "provRdf"}
          onChange={(x: string) => x === "provRdf" && setDocFormat("provRdf")}
          value="provRdf"
          name="radio-buttons"
          label="Prov-RDF"
        />
      </div>
      <div className="w-1/5 flex flex-col gap-2 mt-4">
        <Button
          text="Export"
          rounded="rounded-lg"
          type="primary"
          size="sm"
          onClick={() => {
            handleExport();
          }}
          disabled={!docFormat}
        />
        {downloaded && (
          <Button
            text="Start New"
            rounded="rounded-lg"
            type="primary"
            size="sm"
            onClick={handleStartNew}
          />
        )}
      </div>
    </div>
  );
}
