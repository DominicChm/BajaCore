This folder contains information about the client-server protocol behind communication.
It is byte-based (a decision made for parsing and network bandwidth reasons).
It uses a one-way state model, where client and server both have their own mutable state that is
replicated immutably on the other side. This should avoid state merging issues.

