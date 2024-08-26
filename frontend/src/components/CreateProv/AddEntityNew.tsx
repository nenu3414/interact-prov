import React, { useEffect, useState } from "react";
import TextInput from "../Common/TextInput";
import { Button } from "../Common/Button";
import { toast } from "react-toastify";
import { IEntity, addEntity } from "../../redux/reducers/provSlice";
import { useAppDispatch, useAppSelector } from "../../redux/useRedux";
import { incrementMaxStep, setStep } from "../../redux/reducers/stepSlice";
import Dropdown from "../Common/Dropdown";

export default function AddEntityNew() {
  const options = [
    { label: "Dataset", value: "dataset" },
    { label: "File", value: "file" },
  ];
  const [formData, setFormData] = useState<IEntity>({
    entity_id: "",
    entity_type: options[0].value,
    name: "",
    description: "",
    date: "",
    location: "",
    version: "",
  });
  const dispatch = useAppDispatch();
  const entities = useAppSelector((state) => state.prov.entities);

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
      entity_id: generateUniqueId(),
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
    if (entities.length > 0) {
      const [firstEntity] = entities;
      setFormData(firstEntity);
    }
  }, [entities]);

  const generateUniqueId = () => {
    return `prov-${Date.now()}-${Math.floor(Math.random() * 10000)}`;
  };

  const handleSaveAndNext = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    if (
      !formData.entity_id ||
      !formData.entity_type ||
      !formData.name ||
      !formData.description ||
      !formData.date ||
      !formData.location ||
      !formData.version
    ) {
      toast.error("Please fill out all the required fields");
    } else {
      dispatch(
        addEntity({
          entity_id: formData.entity_id,
          entity_type: formData.entity_type,
          name: formData.name,
          description: formData.description,
          date: formData.date,
          location: formData.location,
          version: formData.version,
        })
      );
      toast.success("Entity saved successfully!");
      dispatch(incrementMaxStep());
    }
  };

  return (
    <div className="w-full basis-1/2">
      <h2 className="text-2xl font-semibold">Add Entity</h2>
      <form onSubmit={handleSaveAndNext} className="pt-4">
        <div className="">
          <TextInput
            label="ID"
            id="id"
            value={formData.entity_id}
            onChange={handleChange}
            placeholder="ID"
            helperText={"Unique ID like ORCID, ROR"}
            required={true}
            error={!formData.entity_id}
          />
        </div>
        <div className="">
          <Dropdown
            label="Type"
            id="type"
            value={formData.entity_type}
            onChange={handleDropdownChange}
            options={options}
            helperText="Select the type of entity"
            error={!formData.entity_type}
          />
        </div>
        <div className="">
          <TextInput
            label="Name"
            id="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Name"
            helperText={"Name of dataset"}
            required={true}
            error={!formData.name}
          />
        </div>
        <div className="">
          <TextInput
            label="Description"
            id="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Description"
            helperText={"Where was collected/created"}
            required={true}
            error={!formData.description}
          />
        </div>
        <div className="">
          <TextInput
            type="date"
            label="Date of Creation/Collection"
            id="date"
            value={formData.date}
            onChange={handleChange}
            helperText={"Date on which this dataset was collected/created"}
            required={true}
            error={!formData.date}
          />
        </div>
        <div className="">
          <TextInput
            label="Location"
            id="location"
            value={formData.location}
            onChange={handleChange}
            placeholder="Location"
            helperText={"Where was collected/created"}
            required={true}
            error={!formData.location}
          />
        </div>
        <div className="">
          <TextInput
            label="Version"
            id="version"
            value={formData.version}
            onChange={handleChange}
            placeholder="Version"
            helperText={"version of dataset"}
            required={true}
            error={!formData.version}
          />
        </div>
        <div className="w-full flex justify-center">
          <div className="flex w-1/2">
            <Button
              text="Save & Next"
              rounded="rounded-full"
              block
              type="primary"
              size="sm"
              buttonType="submit"
            />
          </div>
        </div>
      </form>
    </div>
  );
}
