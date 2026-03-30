import{d as o,r as e}from"./iframe-DrQ-2i7A.js";import"./preload-helper-PPVm8Dsz.js";const i={title:"Components/Select",component:o,tags:["autodocs"],argTypes:{disabled:{control:"boolean"},error:{control:"boolean"},fullWidth:{control:"boolean"}}},r={args:{disabled:!1,error:!1,fullWidth:!1,defaultValue:"us",children:e.createElement(e.Fragment,null,e.createElement("option",{value:"us"},"United States"),e.createElement("option",{value:"ca"},"Canada"),e.createElement("option",{value:"mx"},"Mexico"))}},a={args:{...r.args,disabled:!0}},t={args:{...r.args,error:!0,"aria-label":"Country (invalid)"}},s={args:{...r.args,fullWidth:!0},render:n=>e.createElement("div",{style:{width:320,border:"1px dashed #cbd5e1",padding:16}},e.createElement(o,{...n}))};r.parameters={...r.parameters,docs:{...r.parameters?.docs,source:{originalSource:`{
  args: {
    disabled: false,
    error: false,
    fullWidth: false,
    defaultValue: "us",
    children: <>
                <option value="us">United States</option>
                <option value="ca">Canada</option>
                <option value="mx">Mexico</option>
            </>
  }
}`,...r.parameters?.docs?.source}}};a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`{
  args: {
    ...Default.args,
    disabled: true
  }
}`,...a.parameters?.docs?.source}}};t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:`{
  args: {
    ...Default.args,
    error: true,
    "aria-label": "Country (invalid)"
  }
}`,...t.parameters?.docs?.source}}};s.parameters={...s.parameters,docs:{...s.parameters?.docs,source:{originalSource:`{
  args: {
    ...Default.args,
    fullWidth: true
  },
  render: args => <div style={{
    width: 320,
    border: "1px dashed #cbd5e1",
    padding: 16
  }}>
            <Select {...args} />
        </div>
}`,...s.parameters?.docs?.source}}};const c=["Default","Disabled","WithError","FullWidth"];export{r as Default,a as Disabled,s as FullWidth,t as WithError,c as __namedExportsOrder,i as default};
