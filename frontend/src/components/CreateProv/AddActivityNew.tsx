import React, { useEffect, useState } from "react";
import TextInput from "../Common/TextInput";
import { Button } from "../Common/Button";
import { toast } from "react-toastify";
import { IActivity, addActivity } from "../../redux/reducers/provSlice";
import { useAppDispatch, useAppSelector } from "../../redux/useRedux";
import { incrementMaxStep } from "../../redux/reducers/stepSlice";
import Dropdown from "../Common/Dropdown";

export default function AddActivityNew() {
  const [dropdownOptions, setDropdownOptions] = useState([
    { label: "Please Select", value: "" },
  ]);
  const [formData, setFormData] = useState<IActivity>({
    activity_id: "",
    name: "",
    description: "",
    start_time: "",
    end_time: "",
    consumed: dropdownOptions[0]?.label,
    generated: "",
  });
  const dispatch = useAppDispatch();
  const activities = useAppSelector((state) => state.prov.activities);
  const entities = useAppSelector((state: any) => state.prov.entities);

  useEffect(() => {
    // Map entities to dropdown options format
    if (entities && entities.length > 0) {
      const options = entities.map((entity: any) => ({
        label: entity.name, // Assuming 'name' is the field you want to show in the dropdown
        value: entity.id, // Assuming 'id' is the unique identifier
      }));
      setDropdownOptions([{ label: "Please select", value: "" }, ...options]);
    }
  }, [entities]);

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
      consumed: e.target.value, // Set the value for type from Dropdown
    }));
  };

  useEffect(() => {
    setFormData((prevData: any) => ({
      ...prevData,
      // id: crypto.randomUUID(),
      activity_id: generateUniqueId(),
    }));
  }, []);

  useEffect(() => {
    // If you need to initialize formData based on existing entities:
    if (activities.length > 0) {
      const [firstActivity] = activities;
      setFormData(firstActivity);
    }
  }, [activities]);

  const generateUniqueId = () => {
    return `prov-${Date.now()}-${Math.floor(Math.random() * 10000)}`;
  };

  const handleBack = () => {
    console.log("Back");
  };

  const handleSaveAndNext = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    if (
      !formData.activity_id ||
      !formData.name ||
      !formData.description ||
      !formData.start_time ||
      !formData.end_time ||
      formData.consumed === "Please Select" ||
      !formData.consumed ||
      !formData.generated
    ) {
      toast.error("Please fill out all the required fields");
    } else {
      dispatch(
        addActivity({
          activity_id: formData.activity_id,
          name: formData.name,
          description: formData.description,
          start_time: formData.start_time,
          end_time: formData.end_time,
          consumed: formData.consumed,
          generated: formData.generated,
        })
      );
      toast.success("Activity saved successfully!");
      dispatch(incrementMaxStep());
    }
  };
  return (
    <div className="w-full basis-1/2">
      <h2 className="text-2xl font-semibold">Add Activity</h2>
      <form onSubmit={handleSaveAndNext} className="pt-4">
        <div className="">
          <TextInput
            label="ID"
            id="id"
            value={formData.activity_id}
            onChange={handleChange}
            placeholder="ID"
            helperText={"Unique ID like ORCID, ROR"}
            required={true}
            error={!formData.activity_id}
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
            helperText={"Desceription of activity like what is about"}
            required={true}
            error={!formData.description}
          />
        </div>
        <div className="">
          <TextInput
            type="date"
            label="Start Time"
            id="start_time"
            value={formData.start_time}
            onChange={handleChange}
            placeholder="dd/mm/yyyy"
            helperText={"Start time of activity"}
            required={true}
            error={!formData.start_time}
          />
        </div>
        <div className="">
          <TextInput
            type="date"
            label="End Time"
            id="end_time"
            value={formData.end_time}
            onChange={handleChange}
            placeholder="dd/mm/yyyy"
            helperText={"End time of activity"}
            required={true}
            error={!formData.end_time}
          />
        </div>
        <div className="">
          <Dropdown
            label="Consumed"
            id="consumed"
            value={formData.consumed}
            onChange={handleDropdownChange}
            options={dropdownOptions}
            helperText={"Consumed some or whole part of entity"}
            error={formData.consumed === "Please Select" || !formData.consumed}
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
            error={!formData.generated}
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
              handleBack();
            }}
          />
          <Button
            text="Save & Next"
            rounded="rounded-full"
            block
            type="primary"
            size="sm"
            buttonType="submit"
          />
        </div>
      </form>
    </div>
  );
}
