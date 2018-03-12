# MetagenomeScope

![Screenshot of MetagenomeScope's standard mode, zoomed in on a region of a biofilm assembly graph](https://user-images.githubusercontent.com/4177727/27416728-4c6297d8-56dd-11e7-9d89-472686c7a29e.png "Screenshot of MetagenomeScope's standard mode, zoomed in on a region of a biofilm assembly graph.")

An interactive visualization tool designed for metagenomic sequence assembly
graphs. The tool aims to display a semi-linearized,
hierarchical overview of the input graph while emphasizing the
presence of certain structural patterns in the graph.

To this end, MetagenomeScope highlights certain patterns of contigs in the
graph (bubbles, frayed ropes, chains, and "linear" cycles),
splits the graph into its connected components (only displaying one connected
component at a time),
and uses [Graphviz](http://www.graphviz.org/)' `dot` tool to hierarchically
lay out each connected component of a graph.
MetagenomeScope also supports the use of
[SPQR tree](https://en.wikipedia.org/wiki/SPQR_tree) decompositions
(computed using [OGDF](http://www.ogdf.net/doku.php)) to present an
iteratively expandable hierarchical overview of the biconnected components of
the graph.

MetagenomeScope is composed of two main components:

1. The preprocessing script (contained in the `graph_collator/` directory of
   this repository), a Python and C++ script
   that takes as input an assembly
   graph file and produces a SQLite .db file that can be visualized in the
   viewer interface. `collate.py` is the main script that needs to be run
   here; it uses `spqr.cpp` to interface with OGDF to generate SPQR tree
   decompositions.
   This preprocessing step takes care of
   graph layout, pattern detection, and SPQR tree generation.
   Currently, this supports LastGraph (Velvet), GML
   ([MetaCarvel](https://github.com/marbl/MetaCarvel)), and GFA input
   files. Support for SPAdes FASTG files should be ready very soon, as well.

2. The viewer interface (contained in the `viewer/` directory of this
   repository), a client-side web application that reads a .db file
   generated by `collate.py` and renders the resulting graph using
   [Cytoscape.js](http://js.cytoscape.org/).
   This is coupled with an interface and "control panel" supporting various
   features to help with assembly finishing and exploratory analysis.

The bifurcated nature of the tool lends it a few advantages that have proved
beneficial when analyzing large graphs:

- The user can save a .db file and visualize the contents of the file
  an arbitrary number of later times, without incurring the costs of
  layout/pattern detection/etc. twice
- The user can host the viewer interface and a number of .db files on
  a server, allowing many users to view graphs with the only costs incurred
  being those of rendering the graphs in question

## Demo

A demo of MetagenomeScope's viewer interface is available at
[mgsc.umiacs.io](http://mgsc.umiacs.io/).

## Wiki

Documentation on MetagenomeScope is available at its GitHub wiki,
located [here](https://github.com/marbl/MetagenomeScope/wiki).

## License

MetagenomeScope is licensed under the
[GNU GPL, version 3](https://www.gnu.org/copyleft/gpl.html).

License information for MetagenomeScope's dependencies is included in the root directory of this repository, in `DEPENDENCY_LICENSES.txt`. License copies for dependencies distributed/linked with MetagenomeScope -- when not included with their corresponding source code -- are available in the `dependency_licenses/` directory.

## Acknowledgements

### Preprocessing Script

* [Graphviz](http://www.graphviz.org/) and [PyGraphviz](http://pygraphviz.github.io/)
  * In particular, the `dot` and `sfdp` layout programs are used.
* [NumPy](http://www.numpy.org/)
  * Used to calculate percentiles during edge thickness scaling.
* [OGDF](http://www.ogdf.net/doku.php)
  * Used to construct SPQR trees.
* [cmdline.h](https://github.com/tanakh/cmdline)
  * Used to parse command-line arguments in `spqr.cpp`.
* [pysqlite](https://github.com/ghaering/pysqlite)
  * Used to create [sqlite3](https://sqlite.org/) databases to be loaded in the viewer interface.

### Viewer Interface
* [sql.js](https://github.com/kripken/sql.js/)
  * Used to read [sqlite3](https://sqlite.org/) databases generated by the preprocessing script.
* [Cytoscape.js](https://js.cytoscape.org/)
  * Used to render graphs.
  * Also, the toggling protocol used for the control panel of the viewer interface was inspired by a similar mechanism used in [this Cytoscape.js demo](http://js.cytoscape.org/demos/2ebdc40f1c2540de6cf0/).
* [jQuery](https://jquery.com/)
* [Bootstrap](http://getbootstrap.com/)
    * The icons used to theme various controls in the viewer application are
      from the [Glyphicon](http://glyphicons.com/) Halflings set,
      included with Bootstrap.
    * The color selection functionality in the viewer interface uses the
      [Bootstrap Colorpicker](https://farbelous.github.io/bootstrap-colorpicker/) plugin.

## Contact

MetagenomeScope was created by members of the [Pop Lab](https://sites.google.com/a/cs.umd.edu/poplab/) in the [Center for Bioinformatics and Computational Biology](https://cbcb.umd.edu/) at the [University of Maryland, College Park](https://umd.edu/).

Feel free to email `mfedarko (at) umd (dot) edu` with any questions, suggestions, comments, concerns, etc. regarding the tool. You can also open an [issue](https://github.com/marbl/MetagenomeScope/issues) in this repository, if you'd like.
