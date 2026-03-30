import{j as l,r as t}from"./iframe-DrQ-2i7A.js";import"./preload-helper-PPVm8Dsz.js";const i={title:"Components/TextField",component:l,tags:["autodocs"],argTypes:{error:{control:"boolean"},fullWidth:{control:"boolean"},disabled:{control:"boolean"}}},e={args:{label:"Label",placeholder:"Type here",helperText:"Helper text",error:!1,fullWidth:!1,disabled:!1}},r={args:{...e.args,error:!0,helperText:"This field has an error",defaultValue:"invalid@"}},a={args:{...e.args,disabled:!0,defaultValue:"Read only"}},s={args:{...e.args,fullWidth:!0},render:o=>t.createElement("div",{style:{width:360}},t.createElement(l,{...o}))};e.parameters={...e.parameters,docs:{...e.parameters?.docs,source:{originalSource:`{
  args: {
    label: "Label",
    placeholder: "Type here",
    helperText: "Helper text",
    error: false,
    fullWidth: false,
    disabled: false
  }
}`,...e.parameters?.docs?.source}}};r.parameters={...r.parameters,docs:{...r.parameters?.docs,source:{originalSource:`{
  args: {
    ...Default.args,
    error: true,
    helperText: "This field has an error",
    defaultValue: "invalid@"
  }
}`,...r.parameters?.docs?.source}}};a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`{
  args: {
    ...Default.args,
    disabled: true,
    defaultValue: "Read only"
  }
}`,...a.parameters?.docs?.source}}};s.parameters={...s.parameters,docs:{...s.parameters?.docs,source:{originalSource:`{
  args: {
    ...Default.args,
    fullWidth: true
  },
  render: args => <div style={{
    width: 360
  }}>
            <TextField {...args} />
        </div>
}`,...s.parameters?.docs?.source}}};const c=["Default","WithError","Disabled","FullWidth"];export{e as Default,a as Disabled,s as FullWidth,r as WithError,c as __namedExportsOrder,i as default};
