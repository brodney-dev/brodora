import{l as o,r as t,S as i,T as p,a as e}from"./iframe-DrQ-2i7A.js";import"./preload-helper-PPVm8Dsz.js";const u={title:"Components/Tooltip",component:o,tags:["autodocs"],argTypes:{placement:{control:"select",options:["top","bottom"]},delayEnterMs:{control:"number"}}},n={args:{title:"Save your changes",delayEnterMs:400,placement:"top",children:t.createElement(e,{type:"button"},"Save")},render:s=>t.createElement(o,{...s},t.createElement(e,{type:"button"},"Save"))},a={args:{title:"Keyboard and pointer accessible",delayEnterMs:200,children:t.createElement(e,{type:"button"},"Focus or hover")},render:()=>t.createElement(i,{spacing:3},t.createElement(p,{variant:"body-sm",as:"p",style:{margin:0}},"Hover the control or move focus to it with Tab; the tooltip appears after a short delay and pairs via ",t.createElement("code",null,"aria-describedby"),"."),t.createElement(o,{title:"Keyboard and pointer accessible",delayEnterMs:200},t.createElement(e,{type:"button"},"Focus or hover")))},r={args:{title:"This is a longer explanation that should wrap naturally inside the tooltip without overflowing the layout in typical viewports.",delayEnterMs:0,delayLeaveMs:100,children:t.createElement(e,{type:"button"},"Hover for long text")},render:()=>t.createElement(o,{title:"This is a longer explanation that should wrap naturally inside the tooltip without overflowing the layout in typical viewports.",delayEnterMs:0,delayLeaveMs:100},t.createElement(e,{type:"button"},"Hover for long text"))},l={args:{title:"Tooltip below the anchor",placement:"bottom",delayEnterMs:0,children:t.createElement(e,{type:"button"},"Bottom placement")},render:s=>t.createElement(o,{...s},t.createElement(e,{type:"button"},"Bottom placement"))};n.parameters={...n.parameters,docs:{...n.parameters?.docs,source:{originalSource:`{
  args: {
    title: "Save your changes",
    delayEnterMs: 400,
    placement: "top",
    children: <Button type="button">Save</Button>
  },
  render: args => <Tooltip {...args}>
            <Button type="button">Save</Button>
        </Tooltip>
}`,...n.parameters?.docs?.source}}};a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`{
  args: {
    title: "Keyboard and pointer accessible",
    delayEnterMs: 200,
    children: <Button type="button">Focus or hover</Button>
  },
  render: () => <Stack spacing={3}>
            <Typography variant="body-sm" as="p" style={{
      margin: 0
    }}>
                Hover the control or move focus to it with Tab; the tooltip appears
                after a short delay and pairs via <code>aria-describedby</code>.
            </Typography>
            <Tooltip title="Keyboard and pointer accessible" delayEnterMs={200}>
                <Button type="button">Focus or hover</Button>
            </Tooltip>
        </Stack>
}`,...a.parameters?.docs?.source}}};r.parameters={...r.parameters,docs:{...r.parameters?.docs,source:{originalSource:`{
  args: {
    title: "This is a longer explanation that should wrap naturally inside the tooltip without overflowing the layout in typical viewports.",
    delayEnterMs: 0,
    delayLeaveMs: 100,
    children: <Button type="button">Hover for long text</Button>
  },
  render: () => <Tooltip title="This is a longer explanation that should wrap naturally inside the tooltip without overflowing the layout in typical viewports." delayEnterMs={0} delayLeaveMs={100}>
            <Button type="button">Hover for long text</Button>
        </Tooltip>
}`,...r.parameters?.docs?.source}}};l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:`{
  args: {
    title: "Tooltip below the anchor",
    placement: "bottom",
    delayEnterMs: 0,
    children: <Button type="button">Bottom placement</Button>
  },
  render: args => <Tooltip {...args}>
            <Button type="button">Bottom placement</Button>
        </Tooltip>
}`,...l.parameters?.docs?.source}}};const y=["WithButton","FocusAndHover","LongText","PlacementBottom"];export{a as FocusAndHover,r as LongText,l as PlacementBottom,n as WithButton,y as __namedExportsOrder,u as default};
