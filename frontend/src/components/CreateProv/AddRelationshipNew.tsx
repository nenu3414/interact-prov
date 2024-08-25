// import React, { useState } from "react";
// // import { saveRelationships } from './path/to/formSlice';
// import { toast } from "react-toastify";
// import Dropdown from "../Common/Dropdown";
// import { addRelationship } from "../../redux/reducers/provSlice";
// import { Button } from "../Common/Button";
// import { useAppDispatch, useAppSelector } from "../../redux/useRedux";

// export default function AddRelationshipNew() {
//   const dispatch = useAppDispatch();

//   const entities = useAppSelector((state: any) => state.prov.entities);
//   const activities = useAppSelector((state: any) => state.prov.activities);
//   const agents = useAppSelector((state: any) => state.prov.agents);

//   const options = [
//     ...entities.map((item: any) => ({ label: item.name, value: item.id })),
//     ...activities.map((item: any) => ({ label: item.name, value: item.id })),
//     ...agents.map((item: any) => ({ label: item.name, value: item.id })),
//   ];

//   const relationshipTypes = [
//     { label: "is associated with", value: "associated_with" },
//     { label: "is part of", value: "part_of" },
//     { label: "depends on", value: "depends_on" },
//     // Add more relationship types as needed
//   ];

//   const [relationships, setRelationships] = useState([
//     { entity1: "", relationship: "", entity2: "" },
//   ]);
//   console.log(relationships);
//   const handleAddNewSet = () => {
//     setRelationships([
//       ...relationships,
//       { entity1: "", relationship: "", entity2: "" },
//     ]);
//   };

//   const handleChange = (index: number, field: string, value: string) => {
//     const newRelationships = relationships.map((rel, i) =>
//       i === index ? { ...rel, [field]: value } : rel
//     );
//     setRelationships(newRelationships);
//   };

//   const handleSubmit = () => {
//     if (
//       relationships.some(
//         (rel) => !rel.entity1 || !rel.relationship || !rel.entity2
//       )
//     ) {
//       toast.error("Please complete all relationships before submitting.");
//       return;
//     }

//     // dispatch(addRelationship(relationships)); // Assuming saveRelationships action
//     toast.success("Relationships Saved");
//   };

//   return (
//     <div className="w-full basis-2/5">
//       <div className="flex items-center gap-5">
//         <h2 className="text-2xl font-semibold">Add Relationship</h2>
//         <div>
//           <Button
//             text="+ New"
//             rounded="rounded-full"
//             type="outlined"
//             size="sm"
//             onClick={() => {
//               handleAddNewSet();
//             }}
//           />
//         </div>
//       </div>
//       {relationships.map((rel, index) => (
//         <div key={index} className="mb-2 pt-4 flex flex-col">
//           <Dropdown
//             id="dropdown1"
//             label="First"
//             value={rel.entity1}
//             onChange={(e) => handleChange(index, "entity1", e.target.value)}
//             options={[{ label: "Please select", value: "" }, ...options]}
//             error={!rel.entity1}
//           />
//           <Dropdown
//             id="relationship"
//             label="Relationship"
//             value={rel.relationship}
//             onChange={(e) =>
//               handleChange(index, "relationship", e.target.value)
//             }
//             options={[
//               { label: "Please select", value: "" },
//               ...relationshipTypes,
//             ]}
//             error={!rel.relationship}
//           />
//           <Dropdown
//             id="dropdown2"
//             label="Second"
//             value={rel.entity2}
//             onChange={(e) => handleChange(index, "entity2", e.target.value)}
//             options={[{ label: "Please select", value: "" }, ...options]}
//             error={!rel.entity2}
//           />
//         </div>
//       ))}
//       <div className="flex gap-10">
//         <Button
//           text="Back"
//           rounded="rounded-full"
//           block
//           type="outlined"
//           size="sm"
//           onClick={() => {
//             //   handleSave();
//           }}
//         />
//         <Button
//           text="Save & Next"
//           rounded="rounded-full"
//           block
//           type="primary"
//           size="sm"
//           onClick={() => {
//             //   handleSaveAndNext();
//           }}
//         />
//       </div>
//     </div>
//   );
// }

import React, { useState } from "react";
// import { saveRelationships } from './path/to/formSlice';
import { toast } from "react-toastify";
import Dropdown from "../Common/Dropdown";
import { IRelationship, addRelationship } from "../../redux/reducers/provSlice";
import { Button } from "../Common/Button";
import { useAppDispatch, useAppSelector } from "../../redux/useRedux";
import { incrementMaxStep } from "../../redux/reducers/stepSlice";

export default function AddRelationshipNew() {
  const dispatch = useAppDispatch();
  const generateUniqueId = () => {
    return `id-${Date.now()}-${Math.floor(Math.random() * 10000)}`;
  };
  const entities = useAppSelector((state: any) => state.prov.entities);
  const activities = useAppSelector((state: any) => state.prov.activities);
  const agents = useAppSelector((state: any) => state.prov.agents);
  const new1 = useAppSelector((state: any) => state.prov.relationships);

  const [relationships, setRelationships] = useState<IRelationship[]>([
    { id: generateUniqueId(), subject: "", relationship: "", object: "" },
  ]);
  console.log(entities);
  console.log(activities);
  console.log(agents);
  console.log(new1);

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
      { id: generateUniqueId(), subject: "", relationship: "", object: "" },
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
          value: entity.id,
        }));
      case "Activity":
        return activities.map((activity: any) => ({
          label: activity.name,
          value: activity.id,
        }));
      case "Agent":
        return agents.map((agent: any) => ({
          label: agent.name,
          value: agent.id,
        }));
      default:
        return [];
    }
  };

  const determineType = (value: string) => {
    if (entities.some((entity: any) => entity.id === value)) return "Entity";
    if (activities.some((activity: any) => activity.id === value))
      return "Activity";
    if (agents.some((agent: any) => agent.id === value)) return "Agent";
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
