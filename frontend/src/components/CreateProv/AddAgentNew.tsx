import React, { useEffect, useState } from "react";
import TextInput from "../Common/TextInput";
import { Button } from "../Common/Button";
import { toast } from "react-toastify";
import { IAgent, addAgent } from "../../redux/reducers/provSlice";
import { useAppDispatch, useAppSelector } from "../../redux/useRedux";
import { incrementMaxStep } from "../../redux/reducers/stepSlice";

export default function AddAgentNew() {
  const [formData, setFormData] = useState<IAgent>({
    id: "",
    type: "",
    name: "",
    desc: "",
  });
  const dispatch = useAppDispatch();
  const agents = useAppSelector((state) => state.prov.agents);

  const handleChange = (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    const { id, value } = e.target;
    setFormData((prevData: any) => ({
      ...prevData,
      [id]: value,
    }));
  };

  useEffect(() => {
    setFormData((prevData: any) => ({
      ...prevData,
      // id: crypto.randomUUID(),
      id: generateUniqueId(),
    }));
  }, []);

  // useEffect(() => {
  //   const rEntities = sessionStorage.getItem("entities");
  //   if (rEntities) {
  //     const parsedEntities = JSON.parse(rEntities);
  //     dispatch(addEntity(parsedEntities));
  //   }
  // }, []);

  useEffect(() => {
    // If you need to initialize formData based on existing entities:
    if (agents.length > 0) {
      const [firstAgent] = agents;
      setFormData(firstAgent);
    }
  }, [agents]);

  const generateUniqueId = () => {
    return `id-${Date.now()}-${Math.floor(Math.random() * 10000)}`;
  };

  const handleSave = () => {
    dispatch(
      addAgent({
        id: formData.id,
        type: formData.type,
        name: formData.name,
        desc: formData.desc,
      })
    );
    toast.success("Saved successfully!");
  };

  const handleSaveAndNext = () => {
    dispatch(
      addAgent({
        id: formData.id,
        type: formData.type,
        name: formData.name,
        desc: formData.desc,
      })
    );
    toast.success("Agent saved successfully!");
    dispatch(incrementMaxStep());
  };

  return (
    <div className="w-full basis-1/2">
      <h2 className="text-2xl font-semibold">Add Agent</h2>
      <form onSubmit={(e) => e.preventDefault()} className="pt-4">
        <div className="">
          <TextInput
            label="ID"
            id="id"
            value={formData.id}
            onChange={handleChange}
            placeholder="ID"
            helperText={"Unique ID like ORCID, ROR"}
            required={true}
          />
        </div>
        <div className="">
          <TextInput
            label="Type"
            id="type"
            value={formData.type}
            onChange={handleChange}
            placeholder="Type"
            helperText={"Type of agent"}
            required={true}
          />
        </div>
        <div className="">
          <TextInput
            label="Name"
            id="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Name"
            helperText={"Name of activity"}
            required={true}
          />
        </div>
        <div className="">
          <TextInput
            label="Description"
            id="desc"
            value={formData.desc}
            onChange={handleChange}
            placeholder="Description"
            helperText={"Desceription of activity like what is about"}
            required={true}
          />
        </div>
        <div className="flex gap-10">
          <Button
            text="Save"
            rounded="rounded-full"
            block
            type="outlined"
            size="sm"
            onClick={() => {
              handleSave();
            }}
          />
          <Button
            text="Save & Next"
            rounded="rounded-full"
            block
            type="primary"
            size="sm"
            onClick={() => {
              handleSaveAndNext();
            }}
          />
        </div>
      </form>
    </div>
  );
}
