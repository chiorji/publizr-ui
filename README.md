# Publizr UI
A publication platform

![Dashboard access flowchart](./public/screenshot/dashboard-flow.png)

## Home page
Upon visiting the site, this is the homepage.
#### Click on any of the `get started` buttons to go to the signup page.
#### Click on `publications` link to visit the publications on the platform.
[src/views/home-page.tsx](src/views/home-page.tsx)
![Home page display](./public/screenshot/0-home-page.png)

## Login screen
Allows you to login to the platform, though the platform can be accessed without logging in, but having an account is required for authors who wish to publish their own articles.

#### Provide your email address and password to login to the platform.
[src/views/login-screen.tsx](src/views/login-screen.tsx)
![Recent publication with featured post](./public/screenshot/5-login.png)

## Create account screen
[src/views/signup-screen.tsx](src/views/signup-screen.tsx)
To be able to publish a new post, you must be a registered user, this screen provides registration information
On the screen.
#### provide your `username`, `email`, `password`, and `confirm password` details to sign up.
#### `Craete Account` button is disabled until all details are provided

![Recent publication with featured post](./public/screenshot/8-create-account.png)

#### Failed password strength check
![failed password strength check](./public/screenshot//09-failed-password-strength.png)

#### Passed password strength check
![passed password matching](./public/screenshot/10-passed-password-strength.png)

#### Password and confirm password not matching
![password not matching](./public/screenshot/11-password-not-matching.png)

#### First-time login, no post yet
![first-time login](./public/screenshot/12-dashboard-no-post.png)

### Create new post screen
[src/views/dashboard/index.tsx](src/views/dashboard/index.tsx)
This screen provides a way to create a new post
![Create new post screen](./public/screenshot/3-create-new-post.png)

## Authors posts page
[src/views/posts/post-listing.tsx](src/views/posts/post-listing.tsx)
When an author makes a post, this screen is where the author can see all the post he has made, both `published` and `draft` posts.

![Publications listing](./public/screenshot/01-author-post-dashboard.png)

## Logged in user's basic information
A thumbnail for loggedin users, showing their profile avatar, username, and a logout button

![A thumbnail with username and logout button](./public/screenshot/2-thumbnail-with-logout.png)

## Recent post screen
Here, is a list of the 10-most-recent posts in the platform, ordered by last post date.
It displays a post details, showing the author, date and time of the post, and a link to the post.
This screen only shows the posts authors marked as published.
[src/views/posts/featured-post.tsx](src/views/posts/featured-post.tsx)
![Recent publication with featured post](./public/screenshot/4-recent-publications.png)

## Post screen
Here's a screen that displays the post for reading
![Post details](./public/screenshot/6-post-detail.png)
[src/views/posts/post-detail.tsx](src/views/posts/post-detail.tsx)

## All posts scrren
[src/views/posts/post-listing.tsx](src/views/posts/post-listing.tsx)
An ordered list of all posts, with each item being linked to a post

![Recent publication with featured post](./public/screenshot/7-all-post-listing.png)
