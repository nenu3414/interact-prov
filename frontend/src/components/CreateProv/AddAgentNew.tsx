import React, { useEffect, useState } from "react";
import TextInput from "../Common/TextInput";
import { Button } from "../Common/Button";
import { toast } from "react-toastify";
import { IAgent, addAgent } from "../../redux/reducers/provSlice";
import { useAppDispatch, useAppSelector } from "../../redux/useRedux";
import { incrementMaxStep } from "../../redux/reducers/stepSlice";
import Dropdown from "../Common/Dropdown";

export default function AddAgentNew() {
  const options = [
    { label: "Person", value: "person" },
    { label: "Organization", value: "organization" },
    { label: "Software", value: "software" },
  ];
  const [formData, setFormData] = useState<IAgent>({
    id: "",
    type: options[0].value,
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

  const handleDropdownChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFormData((prevData) => ({
      ...prevData,
      type: e.target.value, // Set the value for type from Dropdown
    }));
  };

  useEffect(() => {
    setFormData((prevData: any) => ({
      ...prevData,
      // id: crypto.randomUUID(),
      id: generateUniqueId(),
    }));
  }, []);

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
          <Dropdown
            label="Type"
            id="type"
            value={formData.type}
            onChange={handleDropdownChange}
            options={options}
            helperText={"Select the type of agent"}
            error={!formData.type}
          />
        </div>
        <div className="">
          <TextInput
            label="Name"
            id="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Name"
            helperText={`Name of ${formData.type}`}
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
            helperText={`Desceription of ${formData.type} like ${
              formData.type === "person"
                ? "gender, occupation etc."
                : formData.type === "organization"
                ? "government, private etc."
                : "OS, technology etc."
            }`}
            required={true}
          />
        </div>
        <div className="flex gap-10">
          <Button
            text="Back"
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
