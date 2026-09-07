# Interaction reference

The booking links use a native Astro/TypeScript interpretation of the magnetic
pointer interaction documented by [Sona UI](https://www.sonaui.com/), by Dinil
Thilakarathne. Reference: https://sonaui.com/r/magnetic-button.json.

The local implementation moves the label within a fixed link hit area, limits
movement to 4px horizontally and 3px vertically, and disables motion for touch
and reduced-motion preferences. It does not install or bundle the React,
Motion or shadcn components. The implementation uses the distance-based falloff
from the reference, with CSS transitions in place of its React spring animation.
