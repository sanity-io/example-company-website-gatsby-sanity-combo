import S from "@sanity/desk-tool/structure-builder";
import { MdBusiness, MdSettings } from "react-icons/md";
import { FaFile } from "react-icons/fa";
import client from "part:@sanity/base/client";
import locationStore from "part:@sanity/base/location";
import { map } from "rxjs/operators";
import { FiEdit, FiInbox, FiDatabase, FiLayers, FiCheck } from "react-icons/fi";

const hiddenTypes = [
  "category",
  "companyInfo",
  "page",
  "person",
  "post",
  "project",
  "siteSettings"
];

const webriqsandbox = S.list()
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
      .child(S.documentTypeList("project")),
    S.listItem()
      .title("Blog posts")
      .child(
        S.list()
          .title("Status")
          .items([
            S.listItem()
              .title("Published (Including New Edits)")
              .icon(FiLayers)
              .schemaType("post")
              .child(
                S.documentTypeList("post")
                  .title("Published (Including Edits)")
                  .filter(
                    "_type == $type && !(_id in path('drafts.**')) && defined(hasBeenPublished) && hasBeenPublished"
                  )
                  .params({
                    type: "post"
                  })
              ),
            S.listItem()
              .title("Drafts (Never Published)")
              .icon(FiEdit)
              .schemaType("post")
              .child(
                S.documentTypeList("post")
                  .title("Drafts (Never Published)")
                  .filter(
                    "_type == $type && _id in path('drafts.**') && !defined(hasBeenPublished)"
                  )
                  .params({
                    type: "post",
                    state: "drafts"
                  })
              ),
            S.listItem()
              .title("Unpublished (Previously Published)")
              .icon(FiInbox)
              .schemaType("post")
              .child(
                S.documentTypeList("post")
                  .title("Unpublished (Previously Published)")
                  .filter(
                    "_type == $type && (_id in path('drafts.**')) && defined(hasBeenPublished) && !hasBeenPublished"
                  )
                  .params({
                    type: "post",
                    state: "drafts"
                  })
              ),
            S.listItem()
              .title("All Posts")
              .icon(FiDatabase)
              .schemaType("post")
              .child(
                S.documentTypeList("post")
                  .title("All Posts")
                  .filter("_type == $type")
                  .params({
                    type: "post"
                  })
              )
          ])
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
  webriqsandbox
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
      const loc = location.pathname.split("/")[1].replace("intent", last) || "webriqsandbox";
      last = loc !== "intent" && loc;
      console.log("PATH", loc);
      return locations[loc];
    })
  );
};
//

// console.log(location.pathname.split("/")[1]);
