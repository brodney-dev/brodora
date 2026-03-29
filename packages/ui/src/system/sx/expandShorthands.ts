type Dict = Record<string, unknown>;

function setSides(
  target: Dict,
  prefix: "margin" | "padding",
  top: unknown,
  right: unknown,
  bottom: unknown,
  left: unknown
) {
  if (top !== undefined) target[`${prefix}Top`] = top;
  if (right !== undefined) target[`${prefix}Right`] = right;
  if (bottom !== undefined) target[`${prefix}Bottom`] = bottom;
  if (left !== undefined) target[`${prefix}Left`] = left;
}

/** Expands `sx` margin/padding shorthands and `bgcolor` into long-form CSS keys. */
export function expandSxShorthands(input: Dict): Dict {
  const src = { ...input };
  const out: Dict = {};

  if ("m" in src) {
    const v = src.m;
    setSides(out, "margin", v, v, v, v);
    delete src.m;
  }
  if ("mx" in src) {
    const v = src.mx;
    setSides(out, "margin", undefined, v, undefined, v);
    delete src.mx;
  }
  if ("my" in src) {
    const v = src.my;
    setSides(out, "margin", v, undefined, v, undefined);
    delete src.my;
  }
  if ("mt" in src) {
    out.marginTop = src.mt;
    delete src.mt;
  }
  if ("mr" in src) {
    out.marginRight = src.mr;
    delete src.mr;
  }
  if ("mb" in src) {
    out.marginBottom = src.mb;
    delete src.mb;
  }
  if ("ml" in src) {
    out.marginLeft = src.ml;
    delete src.ml;
  }

  if ("p" in src) {
    const v = src.p;
    setSides(out, "padding", v, v, v, v);
    delete src.p;
  }
  if ("px" in src) {
    const v = src.px;
    setSides(out, "padding", undefined, v, undefined, v);
    delete src.px;
  }
  if ("py" in src) {
    const v = src.py;
    setSides(out, "padding", v, undefined, v, undefined);
    delete src.py;
  }
  if ("pt" in src) {
    out.paddingTop = src.pt;
    delete src.pt;
  }
  if ("pr" in src) {
    out.paddingRight = src.pr;
    delete src.pr;
  }
  if ("pb" in src) {
    out.paddingBottom = src.pb;
    delete src.pb;
  }
  if ("pl" in src) {
    out.paddingLeft = src.pl;
    delete src.pl;
  }

  if ("bgcolor" in src) {
    out.backgroundColor = src.bgcolor;
    delete src.bgcolor;
  }

  return { ...out, ...src };
}
