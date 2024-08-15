import React, { useState } from "react";
import TextInput from "../Common/TextInput";
import { Button } from "../Common/Button";

export default function AddEntityNew() {
  const [formData, setFormData] = useState<any>({
    about: {
      id: "",
      type: "",
      name: "",
      desc: "",
      doc: "",
    },
    related: {
      peopleOrgsWorks: "",
    },
    structure: {
      schema: "",
      format: "",
    },
    spaceTime: {
      location: "",
      date: "",
    },
    softwareHardware: {
      software: "",
      hardware: "",
    },
    others: {
      notes: "",
    },
  });

  const handleChange = (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>,
    section: string,
    field: string
  ) => {
    setFormData({
      ...formData,
      [section]: {
        ...formData[section],
        [field]: e.target.value,
      },
    });
  };

  //   const handleSubmit = (e: { preventDefault: () => void; }) => {
  //     e.preventDefault();
  //     console.log("Form Submitted", formData);
  //     // You can send the form data to your backend or handle it as needed
  //   };
  return (
    <div className="w-full basis-1/2">
      <h2 className="text-2xl font-semibold">Add Entity</h2>
      <form onSubmit={(e) => e.preventDefault()} className="pt-4">
        <div className="">
          <TextInput
            label="ID"
            id="id"
            value={formData.about.id}
            onChange={(
              e:
                | React.ChangeEvent<HTMLInputElement>
                | React.ChangeEvent<HTMLTextAreaElement>
            ) => handleChange(e, "about", "id")}
            placeholder="Enter Unique ID"
            helperText={"Unique ID like ORCID, ROR"}
            required={true}
          />
        </div>
        <div className="">
          <TextInput
            label="Type"
            id="type"
            value={formData.about.type}
            onChange={(
              e:
                | React.ChangeEvent<HTMLInputElement>
                | React.ChangeEvent<HTMLTextAreaElement>
            ) => handleChange(e, "about", "type")}
            placeholder="Enter Type"
            helperText={"Type of Entity"}
            required={true}
          />
        </div>
        <div className="">
          <TextInput
            label="Name"
            id="name"
            value={formData.about.name}
            onChange={(
              e:
                | React.ChangeEvent<HTMLInputElement>
                | React.ChangeEvent<HTMLTextAreaElement>
            ) => handleChange(e, "about", "name")}
            placeholder="Enter dataset name"
            helperText={"Name of dataset"}
            required={true}
          />
        </div>
        <div className="">
          <TextInput
            label="Description"
            id="desc"
            value={formData.about.description}
            onChange={(
              e:
                | React.ChangeEvent<HTMLInputElement>
                | React.ChangeEvent<HTMLTextAreaElement>
            ) => handleChange(e, "about", "description")}
            placeholder="Enter description"
            helperText={"Desceription of dataset like what is about"}
            required={true}
          />
        </div>
        <div className="">
          <TextInput
            type="date"
            label="Date of Creation/Collection"
            id="doc"
            value={formData.spaceTime.date}
            onChange={(
              e:
                | React.ChangeEvent<HTMLInputElement>
                | React.ChangeEvent<HTMLTextAreaElement>
            ) => handleChange(e, "spaceTime", "date")}
            placeholder="dd/mm/yyyy"
            helperText={"Date on which this dataset was collected/created"}
            required={true}
          />
        </div>
        <div className="">
          <TextInput
            label="Location"
            id="loc"
            value={formData.spaceTime.location}
            onChange={(
              e:
                | React.ChangeEvent<HTMLInputElement>
                | React.ChangeEvent<HTMLTextAreaElement>
            ) => handleChange(e, "spaceTime", "location")}
            placeholder="Enter location"
            helperText={"Where was collected/created"}
            required={true}
          />
        </div>
        <div className="">
          <TextInput
            label="Software"
            id="software"
            value={formData.softwareHardware.software}
            onChange={(
              e:
                | React.ChangeEvent<HTMLInputElement>
                | React.ChangeEvent<HTMLTextAreaElement>
            ) => handleChange(e, "softwareHardware", "software")}
            placeholder="Software name"
            helperText={"Software used to create/collect dataset"}
            required={true}
          />
        </div>
        <div className="">
          <TextInput
            label="Hardware"
            id="hardware"
            value={formData.softwareHardware.hardware}
            onChange={(
              e:
                | React.ChangeEvent<HTMLInputElement>
                | React.ChangeEvent<HTMLTextAreaElement>
            ) => handleChange(e, "softwareHardware", "hardware")}
            placeholder="Hardware name"
            helperText={"Hardware used to create/collect dataset"}
            required={false}
          />
        </div>
        <div className="flex gap-10">
          <Button
            text="Save"
            rounded="rounded-full"
            block
            type="outlined"
            size="sm"
            onClick={() => {}}
          />
          <Button
            text="Save & Next"
            rounded="rounded-full"
            block
            type="primary"
            size="sm"
            onClick={() => {}}
          />
        </div>
      </form>
    </div>
  );
}
