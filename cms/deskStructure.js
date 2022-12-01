import S from "@sanity/desk-tool/structure-builder";
import MdSettings from "react-icons/lib/md/settings";
import MDWeb from "react-icons/lib/md/web";

const hiddenDocTypes = (listItem) =>
  ![
    "siteSettings",
    "homePage",
    "hero",
    "textImageBlock",
    "textBlock",
    "customComponent",
    "carousel",
    "button",
  ].includes(listItem.getId());

export default () =>
  S.list()
    .title("Content")
    .items([
      //
      S.listItem()
        .icon(MdSettings)
        .title("Site Settings")
        .child(
          S.editor().schemaType("siteSettings").documentId("siteSettings")
        ),
      //
      S.divider(),
      //
      ...S.documentTypeListItems().filter(hiddenDocTypes),
    ]);
