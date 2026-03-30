import{k as t}from"./iframe-DrQ-2i7A.js";import"./preload-helper-PPVm8Dsz.js";const d={title:"Components/Textarea",component:t,tags:["autodocs"],argTypes:{error:{control:"boolean"},fullWidth:{control:"boolean"},disabled:{control:"boolean"}}},e={args:{label:"Description",placeholder:"Enter details…",helperText:"Shown below the field.",rows:4,error:!1,fullWidth:!1,disabled:!1}},r={args:{...e.args,error:!0,helperText:"This field is required.",defaultValue:""}},a={args:{...e.args,disabled:!0,defaultValue:"Read-only content."}},s={args:{...e.args,fullWidth:!0},render:l=>React.createElement("div",{style:{width:400}},React.createElement(t,{...l}))};e.parameters={...e.parameters,docs:{...e.parameters?.docs,source:{originalSource:`{
  args: {
    label: "Description",
    placeholder: "Enter details…",
    helperText: "Shown below the field.",
    rows: 4,
    error: false,
    fullWidth: false,
    disabled: false
  }
}`,...e.parameters?.docs?.source}}};r.parameters={...r.parameters,docs:{...r.parameters?.docs,source:{originalSource:`{
  args: {
    ...Default.args,
    error: true,
    helperText: "This field is required.",
    defaultValue: ""
  }
}`,...r.parameters?.docs?.source}}};a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`{
  args: {
    ...Default.args,
    disabled: true,
    defaultValue: "Read-only content."
  }
}`,...a.parameters?.docs?.source}}};s.parameters={...s.parameters,docs:{...s.parameters?.docs,source:{originalSource:`{
  args: {
    ...Default.args,
    fullWidth: true
  },
  render: args => <div style={{
    width: 400
  }}>
            <Textarea {...args} />
        </div>
}`,...s.parameters?.docs?.source}}};const i=["Default","WithError","Disabled","FullWidth"];export{e as Default,a as Disabled,s as FullWidth,r as WithError,i as __namedExportsOrder,d as default};
