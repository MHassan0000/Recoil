import { defineQuery } from "next-sanity";

const IMAGE_FRAGMENT = `"image": image.asset->url`;

export const STARTUPS_QUERY = defineQuery(
	`*[_type == "startup" && defined(slug.current) ] | order(_createdAt desc) {
	_id,
	title,
	slug,
	_createdAt,
	author -> {
		_id, name, username, image, bio
	},
	views,
	description,
	category,
	${IMAGE_FRAGMENT}
	
}`
);
export const STARTUP_BY_ID_QUERY = defineQuery(
	`*[_type == "startup" && _id == $id][0] {
	_id,
	title,
	slug,
	_createdAt,
	author -> {
		_id, name, username, image, bio
	},
	views,
	description,
	category,
	${IMAGE_FRAGMENT},
	pitch
}`
);
export const STARTUP_BY_VIEWS = defineQuery(
	`*[_type == "startup" && _id == $id][0]{
		_id, views
	}`
);
export const AUTHOR_BY_GITHUB_ID_QUERY = defineQuery(
	`*[_type == "author" && id == $id][0]{
		_id, id, name, username, image, bio, email}`

);
export const AUTHOR_BY_ID_QUERY = defineQuery(
	`*[_type == "author" && _id == $id][0]{

		_id,id , _createdAt, name, username, image, bio, email}`

);
export const STARTUPS_BY_AUTHOR_ID_QUERY = defineQuery(
	`*[_type == "startup" && author._ref == $id] | order(_createdAt desc) {
	_id,
	title,
	slug,
	_createdAt,
	author -> {
		_id, name, username, image, bio
	},
	views,
	description,
	category,
	${IMAGE_FRAGMENT}
	
}`
);

export const BOOKMARKS_BY_AUTHOR_ID_QUERY = defineQuery(`
  *[_type == "author" && _id == $id][0]{
    _id,
    name,
    bookmarks[]->{
      _id,
      title,
      slug,
      _createdAt,
      author->{
        _id, name, username, image, bio
      },
      views,
      description,
      category,
      ${IMAGE_FRAGMENT}
    }
  }
`);
