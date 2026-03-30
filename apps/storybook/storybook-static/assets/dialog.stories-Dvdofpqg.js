import{D as l,r as e,a as n,T as r,S as p}from"./iframe-DrQ-2i7A.js";import"./preload-helper-PPVm8Dsz.js";const g={title:"Components/Dialog",component:l,tags:["autodocs"]},o={args:{open:!1,onOpenChange:()=>{},title:"Confirm action",footer:e.createElement(e.Fragment,null,e.createElement(n,{type:"button"},"Cancel"),e.createElement(n,{type:"button"},"Confirm")),children:e.createElement(r,{variant:"body-sm",as:"p",style:{margin:0}},"This uses the native ",e.createElement("code",null,"dialog")," element with"," ",e.createElement("code",null,"showModal()")," for focus management. Press Escape or use the buttons to close.")},render:function(){const[s,t]=e.useState(!1),c=e.useRef(null);return e.createElement(e.Fragment,null,e.createElement(n,{ref:c,type:"button",onClick:()=>t(!0)},"Open dialog"),e.createElement(l,{open:s,onOpenChange:t,title:"Confirm action",footer:e.createElement(e.Fragment,null,e.createElement(n,{type:"button",style:{background:"#f1f5f9",color:"#334155",border:"1px solid #cbd5e1"},onClick:()=>t(!1)},"Cancel"),e.createElement(n,{type:"button",onClick:()=>{t(!1),c.current?.focus()}},"Confirm"))},e.createElement(r,{variant:"body-sm",as:"p",style:{margin:0}},"This uses the native ",e.createElement("code",null,"dialog")," element with"," ",e.createElement("code",null,"showModal()")," for focus management. Press Escape or use the buttons to close.")))}},a={args:{open:!1,onOpenChange:()=>{},title:"Notice",children:e.createElement(r,{variant:"body-sm",as:"p",style:{margin:0}},"Footer slot omitted; close with Escape or programmatically.")},render:function(){const[s,t]=e.useState(!1);return e.createElement(e.Fragment,null,e.createElement(n,{type:"button",onClick:()=>t(!0)},"Open simple dialog"),e.createElement(l,{open:s,onOpenChange:t,title:"Notice"},e.createElement(p,{spacing:2},e.createElement(r,{variant:"body-sm",as:"p",style:{margin:0}},"Footer slot omitted; close with Escape or programmatically."),e.createElement(n,{type:"button",onClick:()=>t(!1)},"Close"))))}};o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`{
  args: {
    open: false,
    onOpenChange: () => {},
    title: "Confirm action",
    footer: <>
                <Button type="button">Cancel</Button>
                <Button type="button">Confirm</Button>
            </>,
    children: <Typography variant="body-sm" as="p" style={{
      margin: 0
    }}>
                This uses the native <code>dialog</code> element with{" "}
                <code>showModal()</code> for focus management. Press Escape or use the
                buttons to close.
            </Typography>
  },
  render: function DialogStory() {
    const [open, setOpen] = React.useState(false);
    const triggerRef = React.useRef<HTMLButtonElement>(null);
    return <>
                <Button ref={triggerRef} type="button" onClick={() => setOpen(true)}>
                    Open dialog
                </Button>
                <Dialog open={open} onOpenChange={setOpen} title="Confirm action" footer={<>
                            <Button type="button" style={{
          background: "#f1f5f9",
          color: "#334155",
          border: "1px solid #cbd5e1"
        }} onClick={() => setOpen(false)}>
                                Cancel
                            </Button>
                            <Button type="button" onClick={() => {
          setOpen(false);
          triggerRef.current?.focus();
        }}>
                                Confirm
                            </Button>
                        </>}>
                    <Typography variant="body-sm" as="p" style={{
          margin: 0
        }}>
                        This uses the native <code>dialog</code> element with{" "}
                        <code>showModal()</code> for focus management. Press Escape or use
                        the buttons to close.
                    </Typography>
                </Dialog>
            </>;
  }
}`,...o.parameters?.docs?.source}}};a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`{
  args: {
    open: false,
    onOpenChange: () => {},
    title: "Notice",
    children: <Typography variant="body-sm" as="p" style={{
      margin: 0
    }}>
                Footer slot omitted; close with Escape or programmatically.
            </Typography>
  },
  render: function WithoutFooterStory() {
    const [open, setOpen] = React.useState(false);
    return <>
                <Button type="button" onClick={() => setOpen(true)}>
                    Open simple dialog
                </Button>
                <Dialog open={open} onOpenChange={setOpen} title="Notice">
                    <Stack spacing={2}>
                        <Typography variant="body-sm" as="p" style={{
            margin: 0
          }}>
                            Footer slot omitted; close with Escape or programmatically.
                        </Typography>
                        <Button type="button" onClick={() => setOpen(false)}>
                            Close
                        </Button>
                    </Stack>
                </Dialog>
            </>;
  }
}`,...a.parameters?.docs?.source}}};const d=["Default","WithoutFooter"];export{o as Default,a as WithoutFooter,d as __namedExportsOrder,g as default};
