export const AUDIT_RULES = {
  IMG_ALT: {
    id: "img-alt",
    title: "Images have alt text",
    whyItMatters: ["Screen readers cannot describe images without alt text."],
    howToFix: [
      "Add meaningful alt attributes to all non-decorative images.",
      'Use alt="" only for purely decorative images.',
    ],
  },

  BUTTON_NAME: {
    id: "button-name",
    title: "Buttons have accessible names",
    whyItMatters: [
      "Screen readers announce buttons based on their accessible name.",
    ],
    howToFix: [
      "Add visible text inside buttons.",
      "Or use aria-label or aria-labelledby for icon buttons.",
    ],
  },

  INPUT_LABEL: {
    id: "input-label",
    title: "Inputs have labels",
    whyItMatters: [
      "Form inputs without labels are confusing for screen reader users.",
    ],
    howToFix: [
      "Associate inputs with <label> using htmlFor.",
      "Or provide an aria-label.",
    ],
  },

  SINGLE_H1: {
    id: "single-h1",
    title: "Page has a single h1",
    whyItMatters: ["Screen readers use the h1 as the page title."],
    howToFix: ["Ensure exactly one h1 exists on the page."],
  },

  HEADING_ORDER: {
    id: "heading-order",
    title: "Heading order is logical",
    whyItMatters: [
      "Improper heading order breaks content structure for assistive tech.",
    ],
    howToFix: ["Do not skip heading levels (e.g., h1 → h3)."],
  },

  MAIN_LANDMARK: {
    id: "main-landmark",
    title: "Page has a main landmark",
    whyItMatters: ["Landmarks help screen reader users navigate quickly."],
    howToFix: [
      "Wrap main content inside a <main> element.",
      'Or use role="main".',
    ],
  },

  LINK_TEXT: {
    id: "link-text",
    title: "Links have meaningful text",
    whyItMatters: ["Screen readers often list links out of context."],
    howToFix: [
      "Replace vague text like 'Click here' with descriptive link text.",
    ],
  },

  KEYBOARD_FOCUS: {
    id: "keyboard-focus",
    title: "Clickable elements are keyboard-focusable",
    whyItMatters: [
      "Keyboard-only users rely on focusable elements to navigate.",
    ],
    howToFix: [
      "Use native buttons and links.",
      'Or add tabindex="0" to custom interactive elements.',
    ],
  },

  ARIA_USAGE: {
    id: "aria-usage",
    title: "ARIA roles are not misused",
    whyItMatters: [
      "Incorrect ARIA usage can break accessibility instead of improving it.",
    ],
    howToFix: [
      "Prefer native HTML elements over ARIA roles.",
      "Do not add redundant roles to native elements.",
    ],
  },

  COLOR_CONTRAST: {
    id: "color-contrast",
    title: "Color contrast meets WCAG AA",
    whyItMatters: ["Low contrast text is difficult for users with low vision."],
    howToFix: [
      "Increase contrast between text and background.",
      "Use WCAG AA contrast ratios as guidance.",
    ],
  },
} as const;

export const GENERIC_LINK_TEXTS = [
  "click here",
  "here",
  "read more",
  "learn more",
  "more",
  "this",
  "this link",
  "link",
  "view",
  "see more",
  "see details",
  "details",
  "continue",
  "go",
  "open",
  "check here",
  "tap here",
  "visit",
  "explore",
  "discover",
  "find out",
  "show more",
  "read",
  "next",
  "previous",
];
