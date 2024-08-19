import React, { useEffect, useState } from "react";
import TextInput from "../Common/TextInput";
import { Button } from "../Common/Button";
import { toast } from "react-toastify";
import { IActivity, addActivity } from "../../redux/reducers/provSlice";
import { useAppDispatch, useAppSelector } from "../../redux/useRedux";
import { incrementMaxStep } from "../../redux/reducers/stepSlice";

export default function AddActivityNew() {
  const [formData, setFormData] = useState<IActivity>({
    id: "",
    name: "",
    desc: "",
    startTime: "",
    endTime: "",
    consumed: "",
    generated: "",
  });
  const dispatch = useAppDispatch();
  const activities = useAppSelector((state) => state.prov.activities);

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
    if (activities.length > 0) {
      const [firstActivity] = activities;
      setFormData(firstActivity);
    }
  }, [activities]);

  const generateUniqueId = () => {
    return `id-${Date.now()}-${Math.floor(Math.random() * 10000)}`;
  };

  const handleSave = () => {
    dispatch(
      addActivity({
        id: formData.id,
        name: formData.name,
        desc: formData.desc,
        startTime: formData.startTime,
        endTime: formData.endTime,
        consumed: formData.consumed,
        generated: formData.generated,
      })
    );
    toast.success("Saved successfully!");
  };

  const handleSaveAndNext = () => {
    dispatch(
      addActivity({
        id: formData.id,
        name: formData.name,
        desc: formData.desc,
        startTime: formData.startTime,
        endTime: formData.endTime,
        consumed: formData.consumed,
        generated: formData.generated,
      })
    );
    toast.success("Activity saved successfully!");
    dispatch(incrementMaxStep());
  };

  return (
    <div className="w-full basis-1/2">
      <h2 className="text-2xl font-semibold">Add Activity</h2>
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
        <div className="">
          <TextInput
            type="date"
            label="Start Time"
            id="startTime"
            value={formData.startTime}
            onChange={handleChange}
            placeholder="dd/mm/yyyy"
            helperText={"Start time of activity"}
            required={true}
          />
        </div>
        <div className="">
          <TextInput
            type="date"
            label="End Time"
            id="endTime"
            value={formData.endTime}
            onChange={handleChange}
            placeholder="dd/mm/yyyy"
            helperText={"End time of activity"}
            required={true}
          />
        </div>
        <div className="">
          <TextInput
            label="Consumed"
            id="consumed"
            value={formData.consumed}
            onChange={handleChange}
            placeholder="Consumed entity"
            helperText={"Consumed some or whole part of entity"}
            required={true}
          />
        </div>
        <div className="">
          <TextInput
            label="Generated"
            id="generated"
            value={formData.generated}
            onChange={handleChange}
            placeholder="Generated entity"
            helperText={"Generated some form of entity"}
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
