import React, { useEffect, useRef, useState } from "react";
import { LOADER } from "../../assets/icons";
import provApi from "../../api/api";
import { useAppDispatch, useAppSelector } from "../../redux/useRedux";
import { Button } from "../Common/Button";
import { incrementMaxStep } from "../../redux/reducers/stepSlice";
import { Graphviz } from "graphviz-react";

export default function Visualize() {
  const graphvizRef = useRef<HTMLDivElement | null>(null);
  const [svgBase64, setSvgBase64] = useState<string>("");
  const [dotData, setDotData] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const dispatch = useAppDispatch();

  const entities = useAppSelector((state: any) => state.prov.entities);
  const activities = useAppSelector((state: any) => state.prov.activities);
  const agents = useAppSelector((state: any) => state.prov.agents);
  const relationships = useAppSelector(
    (state: any) => state.prov.relationships
  );
  const documents = useAppSelector((state) => state.doc);

  const data = {
    entities,
    activities,
    agents,
    relationships,
    documents,
  };

  useEffect(() => {
    setLoading(true);
    provApi
      .createProvGraph(data)
      .then((result) => {
        if (result && result.dot) {
          const formattedDotData = result.dot.replace(/\\n/g, "\n");
          setDotData(formattedDotData);
        } else {
          console.error("DOT data is missing from the response.");
        }
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    if (graphvizRef.current) {
      const svgElement = graphvizRef.current.querySelector("svg");
      if (svgElement) {
        const svgString = new XMLSerializer().serializeToString(svgElement);
        const base64 = btoa(svgString);
        setSvgBase64(`data:image/svg+xml;base64,${base64}`);
      }
    }
  }, [dotData]);

  const downloadImage = (format: string) => {
    if (format === "svg" && svgBase64) {
      const link = document.createElement("a");
      link.href = svgBase64;
      link.download = `${documents.documentName}.svg`;
      link.click();
    } else {
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");
      const img = new Image();

      img.onload = () => {
        canvas.width = img.width;
        canvas.height = img.height;
        ctx?.drawImage(img, 0, 0);

        const link = document.createElement("a");
        if (format === "png") {
          link.href = canvas.toDataURL("image/png");
          link.download = `${documents.documentName}.png`;
        } else if (format === "jpeg") {
          link.href = canvas.toDataURL("image/jpeg");
          link.download = `${documents.documentName}.jpeg`;
        }
        link.click();
      };

      img.src = svgBase64;
    }
  };

  return (
    <div className="w-full basis-[90%]">
      <h2 className="text-2xl font-semibold">Visualize Provenance Graph</h2>
      <div className="border-2 border-black mt-2">
        {loading ? (
          <div className="w-full h-[400px] flex items-center justify-center">
            <img src={LOADER} alt="Loader" className="h-1/5" />
          </div>
        ) : (
          <div ref={graphvizRef}>
            {dotData ? (
              <Graphviz
                dot={dotData}
                options={{
                  useWorker: false,
                  zoom: true,
                  fit: true,
                  height: 500,
                  width: 1000,
                }}
              />
            ) : (
              <p>Loading graph...</p>
            )}
          </div>
        )}
      </div>
      <div className="w-full flex flex-col items-center justify-center mt-3">
        <div className="w-2/5 flex justify-around gap-4 mb-3">
          <Button
            text="Download PNG"
            rounded="rounded-full"
            type="outlined"
            size="sm"
            onClick={() => {
              downloadImage("png");
            }}
          />
          <Button
            text="Download JPEG"
            rounded="rounded-full"
            type="outlined"
            size="sm"
            onClick={() => {
              downloadImage("jpeg");
            }}
          />
          <Button
            text="Download SVG"
            rounded="rounded-full"
            type="outlined"
            size="sm"
            onClick={() => {
              downloadImage("svg");
            }}
          />
        </div>
        <div className="w-1/5">
          <Button
            text="Next"
            rounded="rounded-full"
            type="primary"
            block
            size="sm"
            onClick={() => {
              dispatch(incrementMaxStep());
            }}
          />
        </div>
      </div>
    </div>
  );
}
