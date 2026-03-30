import{e as t,S as n,T as o}from"./iframe-DrQ-2i7A.js";import"./preload-helper-PPVm8Dsz.js";const i={title:"Components/Switch",component:t,tags:["autodocs"],argTypes:{disabled:{control:"boolean"}}},e={args:{disabled:!1,defaultChecked:!1}},a={args:{defaultChecked:!0,disabled:!1}},r={args:{disabled:!0,defaultChecked:!1}},s={render:()=>React.createElement(n,{direction:"row",spacing:2,alignItems:"center"},React.createElement(o,{variant:"body-sm",as:"span"},"Notifications"),React.createElement(t,{defaultChecked:!0,"aria-label":"Enable notifications"}))};e.parameters={...e.parameters,docs:{...e.parameters?.docs,source:{originalSource:`{
  args: {
    disabled: false,
    defaultChecked: false
  }
}`,...e.parameters?.docs?.source}}};a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`{
  args: {
    defaultChecked: true,
    disabled: false
  }
}`,...a.parameters?.docs?.source}}};r.parameters={...r.parameters,docs:{...r.parameters?.docs,source:{originalSource:`{
  args: {
    disabled: true,
    defaultChecked: false
  }
}`,...r.parameters?.docs?.source}}};s.parameters={...s.parameters,docs:{...s.parameters?.docs,source:{originalSource:`{
  render: () => <Stack direction="row" spacing={2} alignItems="center">
            <Typography variant="body-sm" as="span">
                Notifications
            </Typography>
            <Switch defaultChecked aria-label="Enable notifications" />
        </Stack>
}`,...s.parameters?.docs?.source}}};const l=["Default","On","Disabled","WithLabel"];export{e as Default,r as Disabled,a as On,s as WithLabel,l as __namedExportsOrder,i as default};
