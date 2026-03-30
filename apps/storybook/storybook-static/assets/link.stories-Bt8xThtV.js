import{L as o,T as t}from"./iframe-DrQ-2i7A.js";import"./preload-helper-PPVm8Dsz.js";const c={title:"Components/Link",component:o,tags:["autodocs"],argTypes:{underline:{control:"select",options:["always","none","hover"]}}},e={args:{href:"https://example.com",children:"Example link",underline:"hover",target:"_blank",rel:"noopener noreferrer"}},r={render:()=>React.createElement(t,{variant:"body",as:"p"},"Read the"," ",React.createElement(o,{href:"https://example.com",target:"_blank",rel:"noopener noreferrer"},"documentation")," ","for more.")},n={args:{...e.args,underline:"always"}},a={args:{...e.args,underline:"none"}};e.parameters={...e.parameters,docs:{...e.parameters?.docs,source:{originalSource:`{
  args: {
    href: "https://example.com",
    children: "Example link",
    underline: "hover",
    target: "_blank",
    rel: "noopener noreferrer"
  }
}`,...e.parameters?.docs?.source}}};r.parameters={...r.parameters,docs:{...r.parameters?.docs,source:{originalSource:`{
  render: () => <Typography variant="body" as="p">
            Read the{" "}
            <Link href="https://example.com" target="_blank" rel="noopener noreferrer">
                documentation
            </Link>{" "}
            for more.
        </Typography>
}`,...r.parameters?.docs?.source}}};n.parameters={...n.parameters,docs:{...n.parameters?.docs,source:{originalSource:`{
  args: {
    ...Default.args,
    underline: "always"
  }
}`,...n.parameters?.docs?.source}}};a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`{
  args: {
    ...Default.args,
    underline: "none"
  }
}`,...a.parameters?.docs?.source}}};const p=["Default","InlineWithText","UnderlineAlways","NoUnderline"];export{e as Default,r as InlineWithText,a as NoUnderline,n as UnderlineAlways,p as __namedExportsOrder,c as default};
