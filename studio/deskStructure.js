import S from "@sanity/desk-tool/structure-builder";
import { MdBusiness, MdSettings } from "react-icons/md";
import { FaFile } from "react-icons/fa";
import client from "part:@sanity/base/client";
import locationStore from "part:@sanity/base/location";
import { map } from "rxjs/operators";

import EyeIcon from "part:@sanity/base/eye-icon";
import EditIcon from "part:@sanity/base/edit-icon";

import IframePreview from "./components/previews/iframe/IframePreview";
import SeoPreview from "./components/previews/seo/SeoPreviews";

const remoteURL =
  process.env.REMOTE_URL || "https://gatsby-portfolio-preview-poc-4165823465.gtsb.io";
const localURL = "http://localhost:8000";
const previewURL = window.location.hostname === "localhost" ? localURL : remoteURL;
console.log("previewURL", previewURL);

const hiddenTypes = [
  "category",
  "companyInfo",
  "page",
  "person",
  "post",
  "project",
  "siteSettings"
];

const webriq = S.list()
  .title("Content")
  .items([
    S.listItem()
      .title("Site Settings")
      .child(
        S.editor()
          .id("siteSettings")
          .schemaType("siteSettings")
          .documentId("siteSettings")
      )
      .icon(MdSettings),
    S.listItem()
      .title("Company Info")
      .child(
        S.editor()
          .id("companyInfo")
          .schemaType("companyInfo")
          .documentId("companyInfo")
      )
      .icon(MdBusiness),
    S.listItem()
      .title("Projects")
      .schemaType("project")
      .child(
        S.documentTypeList("project")
          .title("Projects")
          .child(documentId =>
            S.document()
              .documentId(documentId)
              .schemaType("project")
              .views([
                S.view.form().icon(EditIcon),
                S.view
                  .component(IframePreview)
                  .options({ previewURL })
                  .icon(EyeIcon)
                  .title("Web Preview"),
                S.view
                  .component(SeoPreview)
                  .options({ previewURL })
                  .icon(EyeIcon)
                  .title("SEO Preview")
              ])
          )
      ),
    S.listItem()
      .title("Blog posts")
      .schemaType("post")
      .child(
        S.documentTypeList("post")
          .title("Blog posts")
          .child(documentId =>
            S.document()
              .documentId(documentId)
              .schemaType("post")
              .views([
                S.view.form().icon(EditIcon),
                S.view
                  .component(IframePreview)
                  .options({ previewURL })
                  .icon(EyeIcon)
                  .title("Web Preview"),
                S.view
                  .component(SeoPreview)
                  .options({ previewURL })
                  .icon(EyeIcon)
                  .title("SEO Preview")
              ])
          )
      ),
    S.listItem()
      .title("Pages")
      .child(
        S.list()
          .title("Pages")
          .items([
            S.listItem()
              .title("About")
              .child(
                S.editor()
                  .id("aboutPage")
                  .schemaType("page")
                  .documentId("about")
              )
              .icon(FaFile),
            S.listItem()
              .title("Contact")
              .child(
                S.editor()
                  .id("contactPage")
                  .schemaType("page")
                  .documentId("contact")
              )
              .icon(FaFile)
          ])
      ),
    S.listItem()
      .title("People")
      .schemaType("person")
      .child(S.documentTypeList("person").title("People")),
    S.listItem()
      .title("Categories")
      .schemaType("category")
      .child(S.documentTypeList("category").title("Categories")),
    ...S.documentTypeListItems().filter(listItem => !hiddenTypes.includes(listItem.getId()))
  ]);

const locations = {
  webriq
};
let last = "";
// Send a message to the parent
var sendMessage = function(msg) {
  // // console.log(msg);
  // console.log(JSON.stringify(msg));
  // Make sure you are sending a string, and to stringify JSON
  window.parent.postMessage(JSON.stringify(msg), "*");
};

export default () => {
  return locationStore.state.pipe(
    map(({ location }) => {
      console.table(location);

      sendMessage({
        origin: "sanityStudio",
        currentPath: location.pathname
      });

      window.currentStudioLocation = location;
      const loc = location.pathname.split("/")[1].replace("intent", last) || "ranch";
      last = loc !== "intent" && loc;
      console.log("PATH", loc);
      return locations[loc];
    })
  );
};
//

// console.log(location.pathname.split("/")[1]);
