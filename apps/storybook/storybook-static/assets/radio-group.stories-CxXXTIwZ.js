import{R as n,r as e,c as a}from"./iframe-DrQ-2i7A.js";import"./preload-helper-PPVm8Dsz.js";const p={title:"Components/RadioGroup",component:n,tags:["autodocs"],argTypes:{orientation:{control:"select",options:["vertical","horizontal"]},disabled:{control:"boolean"}}},r={args:{defaultValue:"a",disabled:!1,orientation:"vertical"},render:s=>e.createElement(n,{...s},e.createElement(a,{value:"a",label:"Option A"}),e.createElement(a,{value:"b",label:"Option B"}),e.createElement(a,{value:"c",label:"Option C"}))},l={args:{...r.args,orientation:"horizontal"},render:r.render},o={render:()=>e.createElement(n,{defaultValue:"a"},e.createElement(a,{value:"a",label:"Available"}),e.createElement(a,{value:"b",label:"Sold out",disabled:!0}),e.createElement(a,{value:"c",label:"Another"}))},t={render:function(){const[u,i]=e.useState("b");return e.createElement(n,{value:u,onValueChange:i},e.createElement(a,{value:"a",label:"Alpha"}),e.createElement(a,{value:"b",label:"Beta"}),e.createElement(a,{value:"c",label:"Gamma"}))}};r.parameters={...r.parameters,docs:{...r.parameters?.docs,source:{originalSource:`{
  args: {
    defaultValue: "a",
    disabled: false,
    orientation: "vertical"
  },
  render: args => <RadioGroup {...args}>
            <Radio value="a" label="Option A" />
            <Radio value="b" label="Option B" />
            <Radio value="c" label="Option C" />
        </RadioGroup>
}`,...r.parameters?.docs?.source}}};l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:`{
  args: {
    ...Default.args,
    orientation: "horizontal"
  },
  render: Default.render
}`,...l.parameters?.docs?.source}}};o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`{
  render: () => <RadioGroup defaultValue="a">
            <Radio value="a" label="Available" />
            <Radio value="b" label="Sold out" disabled />
            <Radio value="c" label="Another" />
        </RadioGroup>
}`,...o.parameters?.docs?.source}}};t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:`{
  render: function ControlledStory() {
    const [value, setValue] = React.useState("b");
    return <RadioGroup value={value} onValueChange={setValue}>
                <Radio value="a" label="Alpha" />
                <Radio value="b" label="Beta" />
                <Radio value="c" label="Gamma" />
            </RadioGroup>;
  }
}`,...t.parameters?.docs?.source}}};const m=["Default","Horizontal","DisabledOption","Controlled"];export{t as Controlled,r as Default,o as DisabledOption,l as Horizontal,m as __namedExportsOrder,p as default};
