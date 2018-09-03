# "github search" task

Here is my solution to the given task. I’ve to modified the scripts (I added as new to package.json), systemjs.builder (loader path) to make it work on my environment. (windows 10, node 8.11.4, npm 5.6.0)

I’ve worked on bonus part (made a component for data visualization with d3js), but unfortunately I could not run karma/jasmine because an error ("karma: header content contains invalid characters"), so I've only added some non-tested unit tests to app-demo.spec.

I pushed the target folder as well which contains the built code and also deployed it to one of my unused private domain to make sure that you can test it.
Here is the link: http://nagynapp.hu/github-repository-search

#### Building locally

```bash
npm install
```

```bash
npm run clean:install:skipTests:modified
```

```bash
cd target
```

```bash
http-server
```


