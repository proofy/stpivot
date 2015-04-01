#sumary Overall description of stpivot project

# Introduction #

**stpivot** is a modified version of default _Pivot viewer_ in **Pentaho BI**, derived from **JPivot** project. It can also be successfully adapted to any web application currently embedding JPivot's interface. Enhancements occurs mainly in user interface and interactions, taking advantage of javascript to improve user experience.

# Details #

Major improvements you'll find in stpivot include:
  * **Rearranged user interface**, with open/close panels for cube navigator, MDX editor and toolbar
  * Limited **use of ajax** to speed up interactions and to avoid page reloading
  * **Easier chart manipulation**, with drag/drop resizing and a simple form to change frecuently used options
  * **Highlighting of MDX syntax** in the editor
  * More frecuently used toolbar options grouped in left side of toolbar, while less frecuently and advanced options were moved to the rigth side.
  * **Iconized user interface**, with a fresh set of icons

Some features you won't find by the moment include:
  * Ability to save analysis view in Pentaho BI (planned for inmediate versions)
  * Optional allocation and arrangement of toolbar icons (discarded beacuse it difficults learning the interface)