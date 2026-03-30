import{S as o,r as t,a as e}from"./iframe-DrQ-2i7A.js";import"./preload-helper-PPVm8Dsz.js";const s=["column","row","column-reverse","row-reverse"],a=["stretch","flex-start","flex-end","center","baseline"],c=["flex-start","flex-end","center","space-between","space-around","space-evenly"],l=["nowrap","wrap","wrap-reverse"],i={direction:{control:"select",options:[...s],description:"Flex main axis"},alignItems:{control:"select",options:[...a]},justifyContent:{control:"select",options:[...c]},flexWrap:{control:"select",options:[...l]},spacing:{control:{type:"number",min:0,max:12,step:1},description:"Gap as a theme spacing multiplier"}},m={title:"Components/Stack",component:o,tags:["autodocs"],argTypes:{...i}},n={args:{direction:"column",spacing:2,alignItems:"stretch"},render:r=>t.createElement(o,{...r},t.createElement(e,null,"First"),t.createElement(e,null,"Second"),t.createElement(e,null,"Third"),t.createElement(e,null,"Fourth"),t.createElement(e,null,"Fifth"))};n.parameters={...n.parameters,docs:{...n.parameters?.docs,source:{originalSource:`{
  args: {
    direction: "column",
    spacing: 2,
    alignItems: "stretch"
  },
  render: args => <Stack {...args}>
            <Button>First</Button>
            <Button>Second</Button>
            <Button>Third</Button>
            <Button>Fourth</Button>
            <Button>Fifth</Button>
        </Stack>
}`,...n.parameters?.docs?.source}}};const d=["FiveButtons"];export{n as FiveButtons,d as __namedExportsOrder,m as default};
