import React, { useEffect, useState } from "react";
import { LOADER } from "../../assets/icons";
import provApi from "../../api/api";
import { useAppDispatch, useAppSelector } from "../../redux/useRedux";
import { Button } from "../Common/Button";
import { incrementMaxStep } from "../../redux/reducers/stepSlice";

export default function Visualize() {
  const [imageSrc, setImageSrc] = useState("");
  const [imageData, setImageData] = useState(null);
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
        if (result) {
          setImageSrc(`data:image/png;base64,${result.image}`);
          setImageData(result.image);
        }
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }, []);

  const downloadImage = (format: string) => {
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    const img = new Image();

    img.onload = () => {
      canvas.width = img.width;
      canvas.height = img.height;
      ctx?.drawImage(img, 0, 0);

      let link = document.createElement("a");
      if (format === "png") {
        link.href = canvas.toDataURL("image/png");
        link.download = "graph.png";
      } else if (format === "jpeg") {
        link.href = canvas.toDataURL("image/jpeg");
        link.download = "graph.jpeg";
      } else if (format === "svg") {
        link.href = `data:image/svg+xml;base64,${imageData}`;
        link.download = "graph.svg";
      }
      link.click();
    };

    img.src = `data:image/png;base64,${imageData}`;
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
          <img
            src={imageSrc}
            alt="Provenance Graph"
            className="h-[400px] w-[1000px]"
          />
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
