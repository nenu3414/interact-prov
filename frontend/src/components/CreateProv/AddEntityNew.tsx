import React, { useEffect, useState } from "react";
import TextInput from "../Common/TextInput";
import { Button } from "../Common/Button";
import { toast } from "react-toastify";
import { IEntity, addEntity } from "../../redux/reducers/provSlice";
import { useAppDispatch, useAppSelector } from "../../redux/useRedux";
import { incrementMaxStep } from "../../redux/reducers/stepSlice";

export default function AddEntityNew() {
  const [formData, setFormData] = useState<IEntity>({
    id: "",
    type: "",
    name: "",
    desc: "",
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
    if (entities.length > 0) {
      const [firstEntity] = entities;
      setFormData(firstEntity);
    }
  }, [entities]);

  const generateUniqueId = () => {
    return `id-${Date.now()}-${Math.floor(Math.random() * 10000)}`;
  };

  const handleSave = () => {
    dispatch(
      addEntity({
        id: formData.id,
        type: formData.type,
        name: formData.name,
        desc: formData.desc,
        date: formData.date,
        location: formData.location,
        version: formData.version,
      })
    );
    toast.success("Saved successfully!");
  };

  const handleSaveAndNext = () => {
    dispatch(
      addEntity({
        id: formData.id,
        type: formData.type,
        name: formData.name,
        desc: formData.desc,
        date: formData.date,
        location: formData.location,
        version: formData.version,
      })
    );
    toast.success("Entity saved successfully!");
    dispatch(incrementMaxStep());
  };

  return (
    <div className="w-full basis-1/2">
      <h2 className="text-2xl font-semibold">Add Entity</h2>
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
            helperText={"Type of Entity"}
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
            helperText={"Name of dataset"}
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
            helperText={"Desceription of dataset like what is about"}
            required={true}
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
