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

  const [currentEntityIndex, setCurrentEntityIndex] = useState<number | null>(
    null
  );

  const dispatch = useAppDispatch();
  const entities = useAppSelector((state) => state.prov.entities);
  const step = useAppSelector((state) => state.step);

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

  const handleDropdownChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFormData((prevData) => ({
      ...prevData,
      entity_type: e.target.value,
    }));
  };

  useEffect(() => {
    if (currentEntityIndex === null) {
      setFormData({
        entity_id: generateUniqueId(),
        entity_type: options[0].value,
        name: "",
        description: "",
        date: "",
        location: "",
        version: "",
      });
    }
  }, [currentEntityIndex]);

  const generateUniqueId = () => {
    return `prov-${Date.now()}-${Math.floor(Math.random() * 10000)}`;
  };

  const validateForm = () => {
    return (
      formData.entity_id &&
      formData.entity_type &&
      formData.name &&
      formData.description &&
      formData.date &&
      formData.location &&
      formData.version
    );
  };

  const handleSaveAndNext = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    if (!validateForm()) {
      toast.error("Please fill out all the required fields");
      return;
    }

    if (currentEntityIndex !== null) {
      // Update the existing entity
      dispatch(
        addEntity({
          ...formData,
          entity_id: entities[currentEntityIndex].entity_id,
        })
      );
      dispatch(setStep(1));
    } else {
      // Add a new entity
      dispatch(addEntity(formData));
      if (step.currentStep < step.maxStep) {
        dispatch(setStep(1));
      } else {
        dispatch(incrementMaxStep());
      }
    }

    toast.success("Entity saved successfully!");
    setCurrentEntityIndex(null);
  };

  const handleEditEntity = (index: number) => {
    setCurrentEntityIndex(index);
    setFormData(entities[index]);
  };

  const handleNewEntity = () => {
    if (currentEntityIndex !== null && !validateForm()) {
      toast.error(
        "Please fill out all the required fields before adding a new entity"
      );
      return;
    }
    if (!validateForm()) {
      toast.error(
        "Please fill out all the required fields before adding a new entity"
      );
      return;
    } else {
      dispatch(addEntity(formData));
    }
    setCurrentEntityIndex(null);
    setFormData({
      entity_id: generateUniqueId(),
      entity_type: options[0].value,
      name: "",
      description: "",
      date: "",
      location: "",
      version: "",
    });
  };

  return (
    <div className="w-full">
      <h2 className="text-2xl font-semibold">Add Entity</h2>
      <div className="flex gap-10">
        <form onSubmit={handleSaveAndNext} className="pt-4 basis-1/2">
          <TextInput
            label="ID"
            id="entity_id"
            value={formData.entity_id}
            onChange={handleChange}
            placeholder="ID"
            helperText={"Unique ID like ORCID, ROR"}
            required={true}
            error={!formData.entity_id}
            disabled
          />
          <Dropdown
            label="Type"
            id="entity_type"
            value={formData.entity_type}
            onChange={handleDropdownChange}
            options={options}
            helperText="Select the type of entity"
            error={!formData.entity_type}
          />
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
          <TextInput
            label="Version"
            id="version"
            value={formData.version}
            onChange={handleChange}
            placeholder="Version"
            helperText={"Version of dataset"}
            required={true}
            error={!formData.version}
          />

          <div className="w-full flex justify-center gap-4">
            <Button
              text="New Entity"
              rounded="rounded-full"
              type="outlined"
              size="sm"
              onClick={handleNewEntity}
            />
            <Button
              text={
                currentEntityIndex !== null ? "Save Changes" : "Save & Next"
              }
              rounded="rounded-full"
              type="primary"
              size="sm"
              buttonType="submit"
            />
          </div>
        </form>
        <div className="basis-1/4 mt-4">
          {entities.length > 0 && (
            <div className="p-4 mb-4 border rounded-md shadow w-full">
              <h3 className="text-lg font-semibold mb-2">Saved Entities</h3>
              <div className="">
                {entities.map((entity, index) => (
                  <div
                    key={entity.entity_id}
                    className="mb-2 flex items-center"
                  >
                    <div className="basis-4/5">
                      <strong>{entity.name}</strong> - {entity.entity_type}
                    </div>
                    <Button
                      text="Edit"
                      rounded="rounded-full"
                      type="primary"
                      size="xs"
                      onClick={() => handleEditEntity(index)}
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
