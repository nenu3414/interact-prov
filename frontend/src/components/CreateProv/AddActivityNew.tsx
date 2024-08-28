import React, { useEffect, useState } from "react";
import TextInput from "../Common/TextInput";
import { Button } from "../Common/Button";
import { toast } from "react-toastify";
import { IActivity, addActivity } from "../../redux/reducers/provSlice";
import { useAppDispatch, useAppSelector } from "../../redux/useRedux";
import { incrementMaxStep, setStep } from "../../redux/reducers/stepSlice";
import Dropdown from "../Common/Dropdown";

export default function AddActivityNew() {
  const [formData, setFormData] = useState<IActivity>({
    activity_id: "",
    name: "",
    description: "",
    start_time: "",
    end_time: "",
  });

  const [currentActivityIndex, setCurrentActivityIndex] = useState<
    number | null
  >(null);

  const dispatch = useAppDispatch();
  const activities = useAppSelector((state) => state.prov.activities);
  const step = useAppSelector((state) => state.step);

  useEffect(() => {
    if (currentActivityIndex === null) {
      setFormData({
        activity_id: generateUniqueId(),
        name: "",
        description: "",
        start_time: "",
        end_time: "",
      });
    }
  }, [currentActivityIndex]);

  const handleChange = (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  const generateUniqueId = () => {
    return `prov-${Date.now()}-${Math.floor(Math.random() * 10000)}`;
  };

  const validateForm = () => {
    return (
      formData.activity_id &&
      formData.name &&
      formData.description &&
      formData.start_time &&
      formData.end_time
    );
  };

  const handleSaveAndNext = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    if (!validateForm()) {
      toast.error("Please fill out all the required fields");
      return;
    }

    if (currentActivityIndex !== null) {
      // Update the existing activity
      dispatch(
        addActivity({
          ...formData,
          activity_id: activities[currentActivityIndex].activity_id,
        })
      );
      dispatch(setStep(2));
    } else {
      // Add a new activity
      dispatch(addActivity(formData));
      if (step.currentStep < step.maxStep) {
        dispatch(setStep(1));
      } else {
        dispatch(incrementMaxStep());
      }
    }

    toast.success("Activity saved successfully!");
    setCurrentActivityIndex(null);
  };

  const handleEditActivity = (index: number) => {
    setCurrentActivityIndex(index);
    setFormData(activities[index]);
  };

  const handleNewActivity = () => {
    if (currentActivityIndex !== null && !validateForm()) {
      toast.error(
        "Please fill out all the required fields before adding a new activity"
      );
      return;
    }
    if (!validateForm()) {
      toast.error(
        "Please fill out all the required fields before adding a new activity"
      );
      return;
    } else {
      dispatch(addActivity(formData));
    }
    setCurrentActivityIndex(null);
    setFormData({
      activity_id: generateUniqueId(),
      name: "",
      description: "",
      start_time: "",
      end_time: "",
    });
  };

  return (
    <div className="w-full">
      <h2 className="text-2xl font-semibold">Add Activity</h2>
      <div className="flex gap-10">
        <form onSubmit={handleSaveAndNext} className="pt-4 basis-1/2">
          <TextInput
            label="ID"
            id="activity_id"
            value={formData.activity_id}
            onChange={handleChange}
            placeholder="ID"
            helperText={"Unique ID"}
            required={true}
            error={!formData.activity_id}
            disabled
          />
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
          <TextInput
            label="Description"
            id="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Description"
            helperText={"Description of activity"}
            required={true}
            error={!formData.description}
          />
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
          <div className="w-full flex justify-center gap-4">
            <Button
              text="New Activity"
              rounded="rounded-full"
              type="outlined"
              size="sm"
              onClick={handleNewActivity}
            />
            <Button
              text={
                currentActivityIndex !== null ? "Save Changes" : "Save & Next"
              }
              rounded="rounded-full"
              type="primary"
              size="sm"
              buttonType="submit"
            />
          </div>
        </form>
        <div className="basis-1/4 mt-4">
          {activities.length > 0 && (
            <div className="p-4 mb-4 border rounded-md shadow w-full">
              <h3 className="text-lg font-semibold mb-2">Saved Activities</h3>
              <div className="">
                {activities.map((activity, index) => (
                  <div
                    key={activity.activity_id}
                    className="mb-2 flex items-center"
                  >
                    <div className="basis-4/5">
                      <strong>{activity.name}</strong>
                    </div>
                    <Button
                      text="Edit"
                      rounded="rounded-full"
                      type="primary"
                      size="xs"
                      onClick={() => handleEditActivity(index)}
                    />
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
