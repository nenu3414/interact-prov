import React, { useState } from "react";
import { toast } from "react-toastify";
import Dropdown from "../Common/Dropdown";
import { IRelationship, addRelationship } from "../../redux/reducers/provSlice";
import { Button } from "../Common/Button";
import { useAppDispatch, useAppSelector } from "../../redux/useRedux";
import { incrementMaxStep } from "../../redux/reducers/stepSlice";

export default function AddRelationshipNew() {
  const dispatch = useAppDispatch();
  const generateUniqueId = () => {
    return `prov-${Date.now()}-${Math.floor(Math.random() * 10000)}`;
  };
  const entities = useAppSelector((state: any) => state.prov.entities);
  const activities = useAppSelector((state: any) => state.prov.activities);
  const agents = useAppSelector((state: any) => state.prov.agents);
  const relationships1 = useAppSelector(
    (state: any) => state.prov.relationships
  );

  const [relationships, setRelationships] = useState<IRelationship[]>([
    {
      relationship_id: generateUniqueId(),
      subject: "",
      relationship: "",
      object: "",
    },
  ]);

  const relationshipTypes: Record<string, string[]> = {
    "Entity-Activity": ["wasGeneratedBy", "used", "WasInvalidatedBy"],
    "Entity-Entity": ["wasDerivedFrom", "hadMember"],
    "Activity-Entity": ["used", "WasStartedBy", "WasEndedBy"],
    "Activity-Agent": ["wasAssociatedWith"],
    "Agent-Agent": ["actedOnBehalfOf"],
    "Entity-Agent": ["wasAttributedTo"],
    "Activity-Activity": ["wasInformedBy"],
  };

  const handleAddNewSet = () => {
    setRelationships([
      ...relationships,
      {
        relationship_id: generateUniqueId(),
        subject: "",
        relationship: "",
        object: "",
      },
    ]);
  };

  const handleChange = (index: number, field: string, value: string) => {
    const newRelationships = relationships.map((rel, i) =>
      i === index ? { ...rel, [field]: value } : rel
    );
    setRelationships(newRelationships);
  };

  const getOptionsForDropdown = (type: string) => {
    switch (type) {
      case "Entity":
        return entities.map((entity: any) => ({
          label: entity.name,
          value: entity.entity_id,
        }));
      case "Activity":
        return activities.map((activity: any) => ({
          label: activity.name,
          value: activity.activity_id,
        }));
      case "Agent":
        return agents.map((agent: any) => ({
          label: agent.name,
          value: agent.agent_id,
        }));
      default:
        return [];
    }
  };

  const determineType = (value: string) => {
    if (entities.some((entity: any) => entity.entity_id === value))
      return "Entity";
    if (activities.some((activity: any) => activity.activity_id === value))
      return "Activity";
    if (agents.some((agent: any) => agent.agent_id === value)) return "Agent";
    return "";
  };

  const handleSubmit = () => {
    if (
      relationships.some(
        (rel) => !rel.subject || !rel.relationship || !rel.object
      )
    ) {
      toast.error("Please complete all fields before submitting.");
      return;
    }

    dispatch(addRelationship(relationships));
    toast.success("Relationships saved successfully!");
    dispatch(incrementMaxStep());
  };

  return (
    <div className="w-full basis-2/5">
      <div className="flex items-center gap-5">
        <h2 className="text-2xl font-semibold">Add Relationship</h2>
        <div>
          <Button
            text="+ New"
            rounded="rounded-full"
            type="outlined"
            size="sm"
            onClick={() => {
              handleAddNewSet();
            }}
          />
        </div>
      </div>
      {relationships.map((rel, index) => {
        const subjectType = determineType(rel.subject);
        const objectType = determineType(rel.object);
        const relationshipKey =
          `${subjectType}-${objectType}` as keyof typeof relationshipTypes;

        return (
          <div key={index} className="mb-2 pt-4 flex flex-col">
            <Dropdown
              id="subject"
              label="Subject"
              value={rel.subject}
              onChange={(e) => handleChange(index, "subject", e.target.value)}
              options={[
                { label: "Please select", value: "" },
                ...getOptionsForDropdown("Entity"),
                ...getOptionsForDropdown("Activity"),
                ...getOptionsForDropdown("Agent"),
              ]}
              error={!rel.subject}
            />
            <Dropdown
              id="relationship"
              label="Relationship"
              value={rel.relationship}
              onChange={(e) =>
                handleChange(index, "relationship", e.target.value)
              }
              options={
                relationshipTypes[relationshipKey]?.map((relType) => ({
                  label: relType,
                  value: relType,
                })) || []
              }
              error={!rel.relationship}
            />
            <Dropdown
              id="object"
              label="Object"
              value={rel.object}
              onChange={(e) => handleChange(index, "object", e.target.value)}
              options={[
                { label: "Please select", value: "" },
                ...getOptionsForDropdown("Entity"),
                ...getOptionsForDropdown("Activity"),
                ...getOptionsForDropdown("Agent"),
              ]}
              error={!rel.object}
            />
          </div>
        );
      })}
      <div className="flex gap-10">
        <Button
          text="Back"
          rounded="rounded-full"
          block
          type="outlined"
          size="sm"
          onClick={() => {
            //   handleSave();
          }}
        />
        <Button
          text="Submit Form"
          rounded="rounded-full"
          block
          type="primary"
          size="sm"
          onClick={() => {
            handleSubmit();
          }}
        />
      </div>
    </div>
  );
}
