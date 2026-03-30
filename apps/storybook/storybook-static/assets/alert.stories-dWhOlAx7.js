import{A as o}from"./iframe-DrQ-2i7A.js";import"./preload-helper-PPVm8Dsz.js";const i={title:"Components/Alert",component:o,tags:["autodocs"],argTypes:{variant:{control:"select",options:["info","success","warning","error"]}}},r={args:{variant:"info",title:"Heads up",children:"Something changed that you should know about."}},e={args:{variant:"success",title:"Saved",children:"Your preferences were updated successfully."}},a={args:{variant:"warning",title:"Action required",children:"Your trial ends in three days."}},n={args:{variant:"error",title:"Something went wrong",children:"We could not complete that request. Try again in a moment."}},t={args:{variant:"info",children:"Compact alert without a title row."}};r.parameters={...r.parameters,docs:{...r.parameters?.docs,source:{originalSource:`{
  args: {
    variant: "info",
    title: "Heads up",
    children: "Something changed that you should know about."
  }
}`,...r.parameters?.docs?.source}}};e.parameters={...e.parameters,docs:{...e.parameters?.docs,source:{originalSource:`{
  args: {
    variant: "success",
    title: "Saved",
    children: "Your preferences were updated successfully."
  }
}`,...e.parameters?.docs?.source}}};a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`{
  args: {
    variant: "warning",
    title: "Action required",
    children: "Your trial ends in three days."
  }
}`,...a.parameters?.docs?.source}}};n.parameters={...n.parameters,docs:{...n.parameters?.docs,source:{originalSource:`{
  args: {
    variant: "error",
    title: "Something went wrong",
    children: "We could not complete that request. Try again in a moment."
  }
}`,...n.parameters?.docs?.source}}};t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:`{
  args: {
    variant: "info",
    children: "Compact alert without a title row."
  }
}`,...t.parameters?.docs?.source}}};const d=["Info","Success","Warning","Error","BodyOnly"];export{t as BodyOnly,n as Error,r as Info,e as Success,a as Warning,d as __namedExportsOrder,i as default};
