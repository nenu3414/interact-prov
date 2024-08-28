import React, { useEffect, useState } from "react";
import TextInput from "../Common/TextInput";
import { Button } from "../Common/Button";
import { toast } from "react-toastify";
import { IAgent, addAgent } from "../../redux/reducers/provSlice";
import { useAppDispatch, useAppSelector } from "../../redux/useRedux";
import { incrementMaxStep, setStep } from "../../redux/reducers/stepSlice";
import Dropdown from "../Common/Dropdown";

export default function AddAgentNew() {
  const options = [
    { label: "Person", value: "person" },
    { label: "Organization", value: "organization" },
    { label: "Software", value: "software" },
  ];

  const [formData, setFormData] = useState<IAgent>({
    agent_id: "",
    agent_type: options[0].value,
    name: "",
    description: "",
  });

  const [currentAgentIndex, setCurrentAgentIndex] = useState<number | null>(
    null
  );

  const dispatch = useAppDispatch();
  const agents = useAppSelector((state) => state.prov.agents);
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
      agent_type: e.target.value,
    }));
  };

  useEffect(() => {
    if (currentAgentIndex === null) {
      setFormData({
        agent_id: generateUniqueId(),
        agent_type: options[0].value,
        name: "",
        description: "",
      });
    }
  }, [currentAgentIndex]);

  const generateUniqueId = () => {
    return `prov-${Date.now()}-${Math.floor(Math.random() * 10000)}`;
  };

  const validateForm = () => {
    return (
      formData.agent_id &&
      formData.agent_type &&
      formData.name &&
      formData.description
    );
  };

  const handleSaveAndNext = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    if (!validateForm()) {
      toast.error("Please fill out all the required fields");
      return;
    }

    if (currentAgentIndex !== null) {
      // Update the existing agent
      dispatch(
        addAgent({
          ...formData,
          agent_id: agents[currentAgentIndex].agent_id,
        })
      );
      dispatch(setStep(3));
    } else {
      // Add a new agent
      dispatch(addAgent(formData));
      if (step.currentStep < step.maxStep) {
        dispatch(setStep(3));
      } else {
        dispatch(incrementMaxStep());
      }
    }

    toast.success("Agent saved successfully!");
    setCurrentAgentIndex(null);
  };

  const handleEditAgent = (index: number) => {
    setCurrentAgentIndex(index);
    setFormData(agents[index]);
  };

  const handleNewAgent = () => {
    if (currentAgentIndex !== null && !validateForm()) {
      toast.error(
        "Please fill out all the required fields before adding a new agent"
      );
      return;
    }
    if (!validateForm()) {
      toast.error(
        "Please fill out all the required fields before adding a new agent"
      );
      return;
    } else {
      dispatch(addAgent(formData));
    }
    setCurrentAgentIndex(null);
    setFormData({
      agent_id: generateUniqueId(),
      agent_type: options[0].value,
      name: "",
      description: "",
    });
  };

  return (
    <div className="w-full">
      <h2 className="text-2xl font-semibold">Add Agent</h2>
      <div className="flex gap-10">
        <form onSubmit={handleSaveAndNext} className="pt-4 basis-1/2">
          <TextInput
            label="ID"
            id="agent_id"
            value={formData.agent_id}
            onChange={handleChange}
            placeholder="ID"
            helperText={"Unique ID"}
            required={true}
            error={!formData.agent_id}
            disabled
          />
          <Dropdown
            label="Type"
            id="agent_type"
            value={formData.agent_type}
            onChange={handleDropdownChange}
            options={options}
            helperText="Select the type of agent"
            error={!formData.agent_type}
          />
          <TextInput
            label="Name"
            id="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Name"
            helperText={"Name of agent"}
            required={true}
            error={!formData.name}
          />
          <TextInput
            label="Description"
            id="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Description"
            helperText={`Description of ${formData.agent_type}`}
            required={true}
            error={!formData.description}
          />

          <div className="w-full flex justify-center gap-4">
            <Button
              text="New Agent"
              rounded="rounded-full"
              type="outlined"
              size="sm"
              onClick={handleNewAgent}
            />
            <Button
              text={currentAgentIndex !== null ? "Save Changes" : "Save & Next"}
              rounded="rounded-full"
              type="primary"
              size="sm"
              buttonType="submit"
            />
          </div>
        </form>
        <div className="basis-1/4 mt-4">
          {agents.length > 0 && (
            <div className="p-4 mb-4 border rounded-md shadow w-full">
              <h3 className="text-lg font-semibold mb-2">Saved Agents</h3>
              <div className="">
                {agents.map((agent, index) => (
                  <div key={agent.agent_id} className="mb-2 flex items-center">
                    <div className="basis-4/5">
                      <strong>{agent.name}</strong> - {agent.agent_type}
                    </div>
                    <Button
                      text="Edit"
                      rounded="rounded-full"
                      type="primary"
                      size="xs"
                      onClick={() => handleEditAgent(index)}
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
