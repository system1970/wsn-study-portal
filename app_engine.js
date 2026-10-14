// =========================================================================
// ECPE39 WIRELESS SENSOR NETWORKS: UNITS 3 & 4 APPLICATION ENGINE
// =========================================================================

let currentUnit = 'unit4';
let currentTab = 'notes';

// Switch between Unit 3 and Unit 4
function setUnit(unitKey) {
  currentUnit = unitKey;
  const isUnit4 = unitKey === 'unit4';

  document.getElementById('unit-btn-unit4').className = isUnit4
    ? 'px-3 py-1 rounded-md text-xs font-bold transition bg-gradient-to-r from-amber-500 to-orange-500 text-white shadow'
    : 'px-3 py-1 rounded-md text-xs font-bold transition text-slate-400 hover:text-white';
  
  document.getElementById('unit-btn-unit3').className = !isUnit4
    ? 'px-3 py-1 rounded-md text-xs font-bold transition bg-gradient-to-r from-sky-500 to-indigo-500 text-white shadow'
    : 'px-3 py-1 rounded-md text-xs font-bold transition text-slate-400 hover:text-white';

  const badge = document.getElementById('unit-pill-badge');
  const subtitle = document.getElementById('unit-subtitle');
  const icon = document.getElementById('unit-icon-badge');
  const metricSlides = document.getElementById('metric-slides');
  const metricProtocols = document.getElementById('metric-protocols');

  if (isUnit4) {
    badge.textContent = 'UNIT-IV';
    badge.className = 'text-[11px] font-mono font-bold text-amber-400 bg-amber-950/80 px-2 py-0.5 rounded border border-amber-800';
    subtitle.textContent = 'Network Layer, Routing Protocols & Data Aggregation';
    icon.innerHTML = '🌐';
    icon.className = 'w-11 h-11 rounded-2xl bg-gradient-to-tr from-amber-500 to-orange-600 flex items-center justify-center shadow-lg shadow-orange-500/20 text-white font-bold text-xl';
    metricSlides.innerHTML = '⚡ <strong>192</strong> Slides';
    metricProtocols.innerHTML = '📡 <strong>20+</strong> Protocols';
  } else {
    badge.textContent = 'UNIT-III';
    badge.className = 'text-[11px] font-mono font-bold text-sky-400 bg-sky-950/80 px-2 py-0.5 rounded border border-sky-800';
    subtitle.textContent = 'Data Link Layer, Wireless MAC & Scheduling';
    icon.innerHTML = '📡';
    icon.className = 'w-11 h-11 rounded-2xl bg-gradient-to-tr from-sky-600 to-indigo-600 flex items-center justify-center shadow-lg shadow-sky-500/20 text-white font-bold text-xl';
    metricSlides.innerHTML = '⚡ <strong>174</strong> Slides';
    metricProtocols.innerHTML = '📡 <strong>18</strong> Protocols';
  }

  // Refresh active tab views
  initLectureNav();
  if (currentTab === 'matrix') renderMatrixView();
  if (currentTab === 'simulators') initSimulatorsTab();
  if (currentTab === 'flashcards') initFlashcards();
  if (currentTab === 'examqa') renderQaView();
  if (currentTab === 'quiz') resetMockQuiz();
  if (currentTab === 'cram') renderCramSheet();
}

function switchTab(tabId) {
  currentTab = tabId;
  document.querySelectorAll('section[id^="view-"]').forEach(el => el.classList.add('hidden'));
  document.getElementById('view-' + tabId).classList.remove('hidden');

  const themeBg = currentUnit === 'unit4' ? 'bg-amber-600' : 'bg-sky-600';
  document.querySelectorAll('.tab-btn').forEach(btn => {
    btn.classList.remove('bg-amber-600', 'bg-sky-600', 'text-white', 'shadow-md');
    btn.classList.add('text-slate-400');
  });
  const activeBtn = document.getElementById('tab-' + tabId);
  activeBtn.classList.remove('text-slate-400');
  activeBtn.classList.add(themeBg, 'text-white', 'shadow-md');

  if (tabId === 'notes') initLectureNav();
  if (tabId === 'matrix') renderMatrixView();
  if (tabId === 'simulators') initSimulatorsTab();
  if (tabId === 'flashcards') initFlashcards();
  if (tabId === 'examqa') renderQaView();
  if (tabId === 'quiz') resetMockQuiz();
  if (tabId === 'cram') renderCramSheet();
}

// -------------------------------------------------------------------------
// DATASETS: UNIT 4
// -------------------------------------------------------------------------
const UNIT4_LECTURES = {
  lec1: {
    title: "Unit 4 • Lecture 1: Network Layer Overview & Routing Metrics",
    sections: [
      {
        heading: "1. WSN Network Layer Role & Multi-Hop Relay Model",
        items: [
          "Direct (single-hop) communication is only feasible in tiny networks where all nodes are within radio range of the gateway.",
          "Large sensor networks covering wide areas require indirect (multi-hop) communication where intermediate nodes serve as relays (forwarding nodes).",
          "Routing Definition: The process of establishing paths from a source to a sink (gateway) across one or more relays.",
          "Deterministic Deployment: Allows predetermined, static routing tables.",
          "Randomized Deployment: Creates non-uniform, unpredictable topologies requiring nodes to self-organize (discover positions, identify neighbors, find paths).",
          "Constraints: Lightweight processing, minimal memory, bandwidth efficiency, and adaptation to frequent node failures. No global IP addressing."
        ]
      },
      {
        heading: "2. Routing Classifications (Al-Karaki & Kamal 2004)",
        items: [
          "Network Structure / Organization: Flat-based (identical roles for all nodes), Hierarchical-based (different roles: cluster heads, forwarders, members), Location-based (uses physical coordinates).",
          "Route Discovery Process: Reactive / On-demand (routes discovered only when needed, incurs discovery delay), Proactive / Table-driven (routes maintained in advance, avoids delay but high overhead and stale routes), Hybrid.",
          "Protocol Operation: Negotiation-based (meta-data exchange to eliminate redundancy, e.g. SPIN), Multipath-based (fault tolerance and throughput), Query-based (receiver-initiated by sink), QoS-based (satisfies latency, energy, packet loss bounds), Coherent vs Non-Coherent (level of local processing before aggregation)."
        ]
      },
      {
        heading: "3. Routing Metrics in WSNs",
        items: [
          "Application Models: Time-driven (periodic sensor reporting) vs Event-driven (reporting triggered when event of interest occurs).",
          "Minimum Hop (Shortest Hop): Finds path with smallest number of relay nodes; minimizes end-to-end delay and relay resource usage.",
          "Energy Metrics (Singh et al. 1998):",
          "  • Minimum energy consumed per packet: Sum of Tx and Rx energy along the path (e.g., path A-D-G with cost 5 vs B-G with cost 6).",
          "  • Maximum time to network partition: Protect critical bridge nodes whose failure disconnects sub-networks (found via Max-Flow Min-Cut Theorem).",
          "  • Minimum variance in node power levels: Balances energy consumption across all nodes equally to extend total network lifetime.",
          "  • Maximum (average) energy capacity: Favors routes with highest total or average battery reserve (e.g. path C-E-G with total capacity 8).",
          "  • Maximum minimum energy capacity: Favors path where the weakest node has highest residual battery (max(min(E))), protecting low-capacity nodes (e.g. path B-G with min capacity 2)."
        ],
        formula: "Max-Flow Min-Cut Theorem | max(min(E_residual)) | ETT = ETX * (S / B)"
      },
      {
        heading: "4. QoS Metrics & Link Quality",
        items: [
          "QoS parameters: End-to-end latency, throughput, jitter (latency variation), and packet loss.",
          "Expected Transmission Time (ETT) (Draves et al. 2004): Time to successfully transmit a packet at MAC layer: ETT = ETX * (S / B).",
          "Expected Transmission Count (ETX) (De Couto et al. 2003): Number of MAC transmissions required to deliver a packet over a link (ETX = 1 / (d_f * d_r)).",
          "Robustness: Protocol estimates link quality to each neighbor, selecting paths that maximize packet reception probability."
        ]
      }
    ]
  },
  lec2: {
    title: "Unit 4 • Lecture 2: Flooding, Gossiping & Data-Centric Routing",
    sections: [
      {
        heading: "1. Flooding vs Gossiping",
        items: [
          "Classic Flooding: Sender broadcasts packet to immediate neighbors, who rebroadcast until all nodes receive or maximum hop limit (TTL) is reached.",
          "Flooding Deficiencies (Heinzelman et al. 1999):",
          "  1. Implosion: Duplicated packets received by the same node from different neighbors (e.g. A sends to B & C, both forward to D).",
          "  2. Overlap: Colocated sensors monitoring overlapping geographic area Y send identical data to neighbor C.",
          "  3. Resource Blindness: Ignores node battery levels; exhausts weak nodes.",
          "Gossiping (Hedetniemi et al. 1988): Probabilistic forwarding where node forwards to random neighbor with probability p, and discards with 1-p. Solves implosion partially, but does not solve overlap or resource blindness; low p causes delivery failures."
        ]
      },
      {
        heading: "2. SPIN (Sensor Protocols for Information via Negotiation)",
        items: [
          "Kulik et al. (2002). Negotiation-based, data-centric, time-driven routing.",
          "Nodes negotiate with neighbors using meta-data before transmitting payload, solving implosion and overlap.",
          "Meta-data requirement: Meta-data size x must be strictly smaller than raw sensor data X (x < X).",
          "Each node has an internal Resource Manager tracking energy consumption, preventing resource blindness.",
          "SPIN Variants:",
          "  • SPIN-PP: Point-to-point 3-way handshake: ADV (advertises meta-data) → REQ (requests data if not possessed) → DATA (transmits payload).",
          "  • SPIN-EC: Energy-constrained version; nodes participate in handshake only if energy > safety threshold.",
          "  • SPIN-BC: Broadcast version for one-to-many channels. Nodes set a random timer before sending REQ; if an identical REQ is overheard, timer is cancelled and duplicate REQ is suppressed! Advertiser broadcasts DATA only once.",
          "  • SPIN-RL: Reliable version of SPIN-BC. Re-requests data if DATA is not received within timeout; limits DATA broadcast frequency."
        ]
      },
      {
        heading: "3. Directed Diffusion (Intanagonwiwat et al. 2000)",
        items: [
          "Data-centric data dissemination named by attribute-value pairs (e.g. type=vehicle, interval=20ms, duration=10s, rect=[-100,-100,200,200]).",
          "Three-Phase Operation:",
          "  1. Interest Propagation: Sink periodically broadcasts an Interest message; nodes diffuse it and set up Gradients (reply links pointing to the neighbor from which interest was received).",
          "  2. Initial Data Delivery: Sensor nodes matching interest generate exploratory data and send along all gradients at low rate.",
          "  3. Reinforcement: Sink reinforces one preferred neighbor (e.g. lowest delay) by sending a high-rate interest; neighbor reinforces its best upstream neighbor. Non-optimal paths are negatively reinforced.",
          "Difference from SPIN: Directed diffusion queries are issued on-demand by sinks, whereas SPIN data is advertised by sources."
        ]
      },
      {
        heading: "4. Rumor Routing & Gradient-Based Routing (GBR)",
        items: [
          "Rumor Routing (Braginsky & Estrin 2002): Strikes a compromise between event flooding and query flooding for moderate query-to-event ratios.",
          "Witnessed event is added to node's Event Table; node generates a long-lived Agent packet with a TTL with a certain probability.",
          "Agent travels through network updating event tables with shortest paths. Queries travel randomly until intersecting an event path, then follow the table.",
          "GBR (Schurgers & Srivastava 2001): Nodes compute Height = minimum hops to base station. Gradient = Height_node - Height_neighbor. Forwards along link with largest gradient.",
          "GBR Traffic Balancing: Stochastic (random among equal gradients), Energy-Based (low battery node increases its height to deflect traffic), Stream-Based (avoids nodes already carrying streams)."
        ],
        formula: "Gradient = Height_node - Height_neighbor"
      }
    ]
  },
  lec3_1: {
    title: "Unit 4 • Lecture 3.1: Proactive, Reactive & Hierarchical Routing",
    sections: [
      {
        heading: "1. Proactive (Table-Driven) Routing",
        items: [
          "DSDV (Destination-Sequenced Distance Vector): Modified Bellman-Ford algorithm. Every node maintains destination, next-hop, distance, and Destination Sequence Number (assigned by destination to prevent loops).",
          "DSDV updates: Full Dump (entire table, infrequent) vs Incremental Packet (changed routes only). Higher sequence number replaces route; if equal, smaller distance replaces route.",
          "OLSR (Optimized Link State Routing) (Clausen et al. 2001): Link-state protocol using Multipoint Relays (MPRs).",
          "Nodes send periodic HELLO packets to discover 1-hop and 2-hop symmetric neighbors. Each node selects an MPR Selector Set (subset of 1-hop neighbors covering all 2-hop neighbors).",
          "Key advantage: ONLY MPRs forward control messages, drastically reducing broadcast traffic compared to classic flooding."
        ]
      },
      {
        heading: "2. Reactive (On-Demand) Routing",
        items: [
          "AODV (Ad Hoc On-Demand Distance Vector) (Perkins & Royer 1999): Broadcasts Route Request (RREQ). Intermediate nodes set up reverse pointers. If destination or intermediate node has fresh route, sends unicast Route Reply (RREP) along reverse path, setting up forward pointers. Broken links trigger Route Error (RERR).",
          "DSR (Dynamic Source Routing) (Johnson 1994): Based on Source Routing. Route Request accumulates addresses of all visited nodes in packet header. Destination unicasts Route Reply with full path. Nodes maintain a Route Cache. Packets carry complete route in header; supports asymmetric links."
        ]
      },
      {
        heading: "3. Hierarchical Routing Protocols",
        items: [
          "Landmark Routing (Tsuchiya 1988): A landmark of radius n is a node known to all nodes within n hops. Hierarchical address format: LM2.LM1.LM0. Route transitions from coarse to fine resolution.",
          "LANMAR (Gerla et al. 2000): Combines Landmark Routing with Fisheye State Routing (FSR). Each landmark is cluster head of a logical subnet.",
          "LEACH: Clustered routing with distributed CH rotation and local data aggregation.",
          "PEGASIS (Power-Efficient Gathering in Sensor Information Systems) (Lindsey & Raghavendra 2002): Chain-based protocol. Nodes form a linear chain using a greedy algorithm. Nodes transmit only to nearest chain neighbor; data aggregates along chain; nodes take turns acting as leader to send to base station. High energy efficiency, but high latency.",
          "Safari Architecture (Du et al. 2008): Self-organizing hierarchy using Drums (landmarks) forming Cells (Level 0 = node, Level 1 = fundamental cells, higher = supercells). Hybrid: reactive DSR within cells, proactive between cells."
        ]
      }
    ]
  },
  lec3_2: {
    title: "Unit 4 • Lectures 3.2, 4 & 4.2: Location-Based, QoS Routing & Data Aggregation",
    sections: [
      {
        heading: "1. Unicast Location-Based Routing",
        items: [
          "GPSR (Greedy Perimeter Stateless Routing) (Karp & Kung 2000): Forwards to neighbor geographically closest to destination. Recovers from Dead-End Voids using Perimeter Routing based on the Right-Hand Rule on planar graphs (RNG / Gabriel Graph GG). Interior clockwise, exterior counterclockwise.",
          "Forwarding Strategies: Greedy (minimizes distance, node E), NFP (Nearest with Forwarding Progress, Hou & Li 1986, node A), MFR (Most Forwarding Progress within Radius, Takagi & Kleinrock 1984, node B), Compass Routing (smallest angle to destination line, Kranakis et al. 1999, node C).",
          "GAF (Geographic Adaptive Fidelity) (Xu et al. 2001): Divides network into a virtual grid. Only 1 active node per grid cell stays awake to forward data; all others sleep. State transitions: Discovery → Active ↔ Sleep."
        ]
      },
      {
        heading: "2. Multicast & Geocasting Location Routing",
        items: [
          "SPBM (Scalable Position-Based Multicast) (Transier et al. 2007): Quad-Tree network representation with L levels. Hierarchical addressing (e.g. square 442). Global and Local member tables.",
          "GEAR (Geographic and Energy Aware Routing) (Yu et al. 2001): Phase 1: Forward to region; Phase 2: Recursive geographic forwarding. Estimated cost: c(N_i, R) = α*d(N_i, R) + (1-α)*e(N_i). Learned cost h(N, R) = h(N_min, R) + C(N, N_min) to route around holes.",
          "GFPG (Geographic-Forwarding-Perimeter-Geocast) (Seada & Helmy 2004): Combines greedy forwarding, perimeter void routing, and region flooding; border nodes route outside to bridge interior gaps."
        ],
        formula: "c(N_i, R) = α * d(N_i, R) + (1 - α) * e(N_i) | h(N, R) = h(N_min, R) + C(N, N_min)"
      },
      {
        heading: "3. QoS-Based Routing (SAR, SPEED & MMSPEED)",
        items: [
          "SAR (Sequential Assignment Routing) (Sohrabi et al. 2000): Builds multiple trees rooted at 1-hop neighbors of the sink. Additive QoS metric. Balances QoS, energy, and packet priority.",
          "SPEED Protocol: Real-time communication with bounded delivery speed. SGNF selects candidates where SendToDelay < D. Proportional RelaySpeed = (L - L_next) / SendToDelay. Neighborhood feedback loop & Back-pressure rerouting around congestion.",
          "MMSPEED (Felemban et al. 2006): Dual differentiation:",
          "  • Timeliness Domain: Virtual speed layers l with SetSpeed_l ≥ ReqSpeed(x) = dist_{s,d}(x) / deadline(x). Piggybacks elapsed time to boost slow packets.",
          "  • Reliability Domain: Multipath forwarding. Reaching probability RP_{i,j}^d = (1 - e_{i,j}) * (1 - e_{i,j})^{[dist_{j,d}/dist_{i,j}]}. Total Reaching Probability TRP = 1 - (1 - TRP)*(1 - RP_{i,j}^d). Adds paths until TRP ≥ P_req."
        ],
        formula: "ReqSpeed(x) = dist_{s,d}(x) / deadline(x) | TRP = 1 - (1 - TRP)*(1 - RP_{i,j}^d)"
      },
      {
        heading: "4. Data Aggregation Techniques in WSNs",
        items: [
          "Definition: Gathering data from multiple sensors at intermediate nodes using mathematical functions or SQL queries to eliminate redundant transmission and send fused information to the base station.",
          "Core Axiom: Communication consumes considerably more energy than computation!",
          "Results: Reduced traffic, lower energy consumption, enhanced network lifetime.",
          "Efficacy Metrics: Accuracy (difference from true value), Completeness (% of readings included), Latency (reporting delay), Message Overhead (traffic volume).",
          "Aggregation Functions: COUNT, SUM, AVERAGE, MIN, MAX using parameter SNAttributes (function of neighbor size, time t, distance d, arrival rate).",
          "Query Types: Simple (predicate filter, no aggregates), Complex (aggregates + subqueries), Event-Driven (periodic reporting).",
          "Four Aggregation Methodologies: Centralized (single central node), In-Network (lossy with size reduction vs lossless without size reduction), Tree-Based (TAG minimum spanning tree), Cluster-Based (LEACH, HEED, CLUDDA). Protocols: DRINA, M-DRINA."
        ]
      }
    ]
  }
};

const UNIT3_LECTURES = {
  lec1: {
    title: "Unit 3 • Lecture 1: Fundamentals of Wireless MAC Protocols",
    sections: [
      {
        heading: "1. Data Link Layer & MAC Responsibilities",
        items: [
          "Layer 2 in OSI model controls medium access. IEEE 802 splits it into LLC (Logical Link Control) and MAC (Medium Access Control).",
          "MAC operates directly on physical layer; arbitrates channel access, resolves contention, framing, addressing, and physical error control.",
          "Contention-Free (FDMA, TDMA, CDMA, Polling, Token Passing, Reservation) vs Contention-Based (ALOHA, CSMA, MACA, MACAW) vs Hybrid."
        ]
      },
      {
        heading: "2. CSMA Variants & Wireless Limitations",
        items: [
          "CSMA/CD cannot work in wireless because transmit power >> receive power and collisions happen at receiver.",
          "1-Persistent, Non-Persistent, and p-Persistent CSMA.",
          "CSMA/CA uses DIFS + random backoff. Shorter backoff wins; others freeze timers and resume after transmission + DIFS."
        ]
      },
      {
        heading: "3. Hidden & Exposed Terminal Problems",
        items: [
          "Hidden Terminal: Out-of-range senders collide at common receiver. Solved via RTS/CTS handshakes (MACA/MACAW).",
          "Exposed Terminal: Node unnecessarily delays transmission to an inactive node due to carrier sensing an adjacent sender."
        ]
      }
    ]
  },
  lec2: {
    title: "Unit 3 • Lecture 2: WSN MAC Characteristics & Contention-Free Protocols",
    sections: [
      {
        heading: "1. Characteristics & DPM",
        items: [
          "Energy efficiency is top priority. Dynamic Power Management (DPM): Active, Idle, Sleep.",
          "Receive and Idle draw almost identical current; Sleep mode draws microamps.",
          "Duty Cycle = Active Time / Total Period. Radios: RFM TR1000 (12 mA Tx, 3.8 mA Rx, 0.7 µA sleep), MC13202 (Hibernate & Sleep), CC1000, CC2420."
        ]
      },
      {
        heading: "2. Contention-Free Protocols",
        items: [
          "TRAMA: Traffic-adaptive TDMA. NP (2-hop map), SEP (bitmap), AEA hash prio(i,t)=hash(i⊕t). Slots only given to active senders; others sleep.",
          "Y-MAC: Multi-channel TDMA. Receiver-driven unicast slots; channel hopping on bursts.",
          "DESYNC-TDMA: Ring oscillators jump to midpoint of neighbor firings: φ_mid = φ_i + ½(Δ_{i+1} - Δ_i) mod 1. No global clock!",
          "LEACH: Cluster head rotation via P_i(t) formula. Intra-cluster TDMA, inter-cluster CDMA/DSSS.",
          "LMAC & MLMAC: Distributed TDMA slots (Control header + Data). MLMAC adds mobility support."
        ]
      }
    ]
  },
  lec3: {
    title: "Unit 3 • Lecture 3: Contention-Based MAC Protocols (Part 1)",
    sections: [
      {
        heading: "1. PAMAS, S-MAC, T-MAC, PMAC",
        items: [
          "PAMAS: Dual physical channels (Data + Control) to eliminate overhearing. Probe frames on wakeup.",
          "S-MAC: Synchronized Listen/Sleep duty cycling via SYNC frames. Overhearing sleep via RTS/CTS. Message passing fragmentation.",
          "T-MAC: Variable active period ending after idle timeout TA. Early Sleeping solved by FRTS and dummy DS packets.",
          "PMAC: Tentative sleep bit patterns 0^m 1. Doubles sleep exponentially under light traffic. PETF and PRTF frames."
        ]
      }
    ]
  },
  lec4: {
    title: "Unit 3 • Lectures 4 & 5: Advanced MAC & Hybrid Protocols",
    sections: [
      {
        heading: "1. RMAC, DW-MAC, DMAC, WiseMAC, RI-MAC",
        items: [
          "RMAC: Pioneer (PION) frame reserves multi-hop path in DATA period; data crosses multiple hops in single SLEEP period.",
          "DW-MAC: Proportional 1:1 mapping T_i^S = T_i^D * (T_sleep / T_data) prevents SLEEP collisions.",
          "DMAC: Staggered chain reaction in convergecast trees. Depth d packet arrives in d intervals.",
          "WiseMAC: Adaptive preamble sampling; base station learns receiver offsets to shorten Tp.",
          "RI-MAC: Receiver-initiated beacons invite data and acknowledge previous frames."
        ]
      },
      {
        heading: "2. Hybrid Protocols (Z-MAC & MH-MAC)",
        items: [
          "Z-MAC: DRAND 2-hop slots. Local frame TF=2^a. Owner backoff [0,To], non-owner [To,Tno]. ECN triggers HCL mode (pure TDMA).",
          "MH-MAC: Static nodes use TDMA slots; mobile nodes use 2-phase CSMA. RSSI Hello estimation tunes static/mobile slot ratio."
        ]
      }
    ]
  }
};

// -------------------------------------------------------------------------
// PROTOCOLS DATASET
// -------------------------------------------------------------------------
const UNIT4_PROTOCOLS = [
  { name: "SPIN (SPIN-PP / EC / BC / RL)", category: "Data-Centric", author: "Kulik et al. 2002", obj: "Overcome flooding deficiencies using meta-data negotiation and resource managers", mech: "3-way handshake: ADV → REQ → DATA. SPIN-EC checks energy threshold. SPIN-BC uses broadcast timers. SPIN-RL adds reliable re-requests.", formula: "Meta-data size x < raw data X", pro: "Eliminates implosion and overlap; energy aware", con: "Cannot guarantee data delivery if intermediate nodes refuse requests" },
  { name: "Directed Diffusion", category: "Data-Centric", author: "Intanagonwiwat et al. 2000", obj: "Application-aware data dissemination using named attribute-value pairs", mech: "Sink broadcasts Interests; nodes build Gradients. Exploratory data sent. Sink positively reinforces best path; negatively reinforces others.", formula: "Attribute-value naming: type, interval, duration, rect", pro: "Neighbor-to-neighbor communication; local caching and in-network aggregation", con: "Query-based overhead; unsuitable for continuous data streaming" },
  { name: "Rumor Routing", category: "Data-Centric", author: "Braginsky & Estrin 2002", obj: "Compromise between event flooding and query flooding for moderate query/event ratios", mech: "Event logged in Event Table; node generates an Agent packet with TTL. Agent updates nodes' tables. Queries travel randomly until hitting an event path.", formula: "TTL decrement at each hop", pro: "Much lower overhead than flooding when query-to-event ratio is moderate", con: "Non-optimal routes and higher delivery latency" },
  { name: "Gradient-Based Routing (GBR)", category: "Data-Centric", author: "Schurgers & Srivastava 2001", obj: "Forward data along the steepest hop-count gradient to the sink", mech: "Nodes calculate Height (min hops to sink). Gradient = Height_node - Height_neighbor. Forwards to largest gradient. 3 traffic balancing schemes (Stochastic, Energy, Stream).", formula: "Gradient = Height_node - Height_neighbor", pro: "Low complexity, built-in traffic balancing and load deflection", con: "Requires periodic interest flooding to refresh node heights" },
  { name: "DSDV", category: "Proactive", author: "Perkins & Bhagwat 1994", obj: "Loop-free distance vector routing using destination sequence numbers", mech: "Routing tables updated periodically. Destination Sequence Numbers distinguish fresh routes. Full dumps vs small incremental packets.", formula: "Update rule: SeqNum_new > SeqNum_old OR (equal AND hops_new < hops_old)", pro: "Instant route availability without route discovery delays", con: "High control overhead; stale routes under high mobility" },
  { name: "OLSR", category: "Proactive", author: "Clausen et al. 2001", obj: "Optimized link-state routing using Multipoint Relays (MPRs)", mech: "Periodic HELLO messages discover 1-hop and 2-hop symmetric neighbors. Each node chooses an MPR Selector Set. ONLY MPRs forward control messages.", formula: "MPR set covers all 2-hop symmetric neighbors", pro: "Massive reduction in duplicate retransmissions over classic flooding", con: "Maintaining 2-hop neighborhood state requires continuous HELLO broadcasts" },
  { name: "AODV", category: "Reactive", author: "Perkins & Royer 1999", obj: "Pure on-demand distance vector routing with minimal control overhead", mech: "Broadcasts RREQ to discover route; intermediate nodes set reverse pointers. Destination/intermediate sends unicast RREP along reverse path. RERR for broken links.", formula: "RREQ tuple: <Source IP, Broadcast ID, Dest IP, Dest Seq, Hop Count>", pro: "Low memory and zero routing overhead when no communication occurs", con: "Route discovery latency before data transmission; flooding overhead during RREQ" },
  { name: "DSR (Dynamic Source Routing)", category: "Reactive", author: "Johnson 1994", obj: "Source routing protocol where entire route is carried in the packet header", mech: "RREQ accumulates visited node addresses. Destination extracts path and returns RREP. Route cache stores complete routes. Handles asymmetric links.", formula: "Full route header: [S, N1, N2, ... Dest]", pro: "Intermediate nodes need no routing tables; supports asymmetric links", con: "Packet header overhead increases significantly with hop count" },
  { name: "Landmark Routing", category: "Hierarchical", author: "Tsuchiya 1988", obj: "Multi-level hierarchical routing without centralized cluster heads", mech: "Landmark of radius n is known to all nodes within n hops. Hierarchical address LM2.LM1.LM0. Routing switches from coarse to fine resolution.", formula: "Address: LM2.LM1.LM0", pro: "High scalability; bounds routing table size in massive networks", con: "Non-optimal paths and complex landmark election maintenance" },
  { name: "LANMAR", category: "Hierarchical", author: "Gerla et al. 2000", obj: "Scalable routing for mobile ad-hoc groups", mech: "Combines Landmark Routing with Fisheye State Routing (FSR). Landmarks act as cluster heads for logical subnets; detailed updates kept within local scope.", formula: "Fisheye scope update frequency gradient", pro: "Drastically cuts routing overhead for mobile group topologies", con: "Depends on predetermined logical subnets and group mobility patterns" },
  { name: "PEGASIS", category: "Hierarchical", author: "Lindsey & Raghavendra 2002", obj: "Chain-based energy-efficient data gathering", mech: "Greedy algorithm constructs a linear chain of all nodes. Nodes transmit only to closest neighbor. Data aggregates along chain; 1 node sends to base station.", formula: "Chain formation greedy distance metric", pro: "Extends network lifetime significantly compared to LEACH", con: "Extreme end-to-end latency; bottleneck if chain breaks" },
  { name: "Safari Architecture", category: "Hierarchical", author: "Du et al. 2008", obj: "Self-organizing hierarchical routing using Drums and Cells", mech: "Drums broadcast periodic beacons. Level 0 = node, Level 1 = fundamental cell, higher = supercells. Reactive DSR within cells, proactive between cells.", formula: "Cell hierarchy levels 0 to L-1", pro: "High scalability; balances reactive and proactive strengths", con: "Periodic beacon overhead from drums" },
  { name: "GPSR", category: "Location-Based", author: "Karp & Kung 2000", obj: "Stateless geographic routing using greedy forwarding and perimeter recovery", mech: "Greedy mode picks neighbor closest to destination. Recovers from dead-end voids using Perimeter Mode via the Right-Hand Rule on planar graphs (RNG/GG).", formula: "Planar graph: Gabriel Graph (GG) / Relative Neighborhood Graph (RNG)", pro: "Stateless (only requires 1-hop neighbor coordinates); highly scalable", con: "Perimeter routing paths can be long; planar graph maintenance overhead" },
  { name: "GAF (Geographic Adaptive Fidelity)", category: "Location-Based", author: "Xu et al. 2001", obj: "Energy-aware location routing through virtual grid sleep scheduling", mech: "Divides network into virtual grid cells. Only 1 active node per cell relays packets; all other nodes sleep. States: Discovery → Active ↔ Sleep.", formula: "Cell size r <= R / sqrt(5)", pro: "Dramatic energy savings; maintains network connectivity despite sleeping nodes", con: "Requires node GPS / localization hardware" },
  { name: "SPBM", category: "Location-Based", author: "Transier et al. 2007", obj: "Scalable position-based multicast using quad-tree hierarchies", mech: "Network represented as Quad-Tree with L levels. Hierarchical addressing (square 442). Nodes maintain Global and Local member tables.", formula: "Quad-tree levels 0 to L-1", pro: "Efficient group membership without bloating packet headers", con: "Quad-tree boundary maintenance under mobile nodes" },
  { name: "GEAR", category: "Location-Based", author: "Yu et al. 2001", obj: "Energy-aware geocasting with learned void circumvention", mech: "Phase 1: Forward to region using estimated cost c(Ni, R) = α*d + (1-α)*e. Phase 2: Recursive forwarding within region. Updates learned cost h(N,R) when in holes.", formula: "c(N_i, R) = α * d(N_i, R) + (1 - α) * e(N_i) | h(N, R) = h(N_min, R) + C(N, N_min)", pro: "Balances energy and distance; learns routes around voids", con: "High computational overhead for learned cost convergence" },
  { name: "GFPG", category: "Location-Based", author: "Seada & Helmy 2004", obj: "Guaranteed packet delivery into geocast regions with internal voids", mech: "Greedy forwarding to region; perimeter routing around exterior voids; flooding inside region. Border nodes route outside via right-hand rule to bridge gaps.", formula: "Planar face traversal across region gaps", pro: "Guaranteed geocast delivery despite internal disconnected clusters", con: "Higher packet overhead caused by exterior border traversals" },
  { name: "SAR (Sequential Assignment Routing)", category: "QoS-Based", author: "Sohrabi et al. 2000", obj: "Multi-path routing providing fault tolerance and QoS bounds", mech: "Builds multiple trees, each rooted at a 1-hop neighbor of sink. Trees avoid low QoS nodes. Selects path based on additive QoS metric, energy, and priority.", formula: "Additive QoS metric along multi-tree paths", pro: "Fault-tolerant multi-path recovery; differentiates packet priorities", con: "Expensive tree creation and maintenance in large networks" },
  { name: "SPEED", category: "QoS-Based", author: "He et al. 2003", obj: "Stateless real-time communication with guaranteed delivery speed", mech: "SGNF selects candidates with SendToDelay < D. RelaySpeed = (L - L_next) / SendToDelay. Neighborhood feedback loop and back-pressure rerouting mitigate congestion.", formula: "RelaySpeed = (L - L_next) / SendToDelay", pro: "Stateless, localized; guarantees bounded delivery delay", con: "Drops packets when congestion cannot be resolved by back-pressure" },
  { name: "MMSPEED", category: "QoS-Based", author: "Felemban et al. 2006", obj: "Multi-path multi-speed routing providing dual timeliness and reliability QoS", mech: "Timeliness: Virtual speed layers l with SetSpeed_l ≥ ReqSpeed(x). Reliability: Multipath forwarding where Total Reaching Probability TRP ≥ P_req.", formula: "ReqSpeed(x) = dist / deadline | TRP = 1 - (1 - TRP)*(1 - RP_{i,j}^d)", pro: "Differentiates traffic simultaneously across latency and packet loss domains", con: "Multiple redundant paths consume extra energy under high reliability targets" },
  { name: "TAG (Tiny Aggregation)", category: "Data Aggregation", author: "Madden et al. 2002", obj: "Tree-based in-network data aggregation service for sensor networks", mech: "Constructs routing tree rooted at sink. SQL-like declarative queries with aggregates (COUNT, SUM, AVG, MIN, MAX). Aggregates parent values during return.", formula: "Aggregate functions: fcnt, fsum, favg, fmin, fmax", pro: "Massive bandwidth reduction; declarative SQL interface", con: "Parent node loss corrupts an entire subtree of sensor readings" },
  { name: "DRINA & M-DRINA", category: "Data Aggregation", author: "Villas et al. 2013", obj: "Data routing and in-network aggregation for maximizing shared routes", mech: "Builds shortest path tree that maximizes route sharing among colocated event sources to maximize in-network aggregation opportunities.", formula: "Clustering & tree fusion metrics", pro: "High aggregation ratio; minimizes message count", con: "Tree re-structuring latency when event locations change" }
];

const UNIT3_PROTOCOLS = [
  { name: "Pure ALOHA", category: "Classic", author: "Abramson 1970", obj: "Uncoordinated channel access", mech: "Transmit immediately; wait for ACK; backoff randomly on collision.", formula: "Vulnerable period = 2 * T_pkt", pro: "Utterly simple", con: "Max throughput only ~18.4%" },
  { name: "Slotted ALOHA", category: "Classic", author: "Roberts 1972", obj: "Halve vulnerable collision period", mech: "Transmissions permitted only at the beginning of discrete time slots.", formula: "Vulnerable period = 1 * T_pkt", pro: "Doubles throughput to ~36.8%", con: "Requires global clock synchronization" },
  { name: "CSMA/CA", category: "Classic", author: "IEEE 802.11", obj: "Collision avoidance in wireless", mech: "DIFS wait + random backoff. Shorter backoff transmits; others freeze timers.", formula: "Backoff = random(0, CW) * s", pro: "Prevents immediate burst collisions", con: "Vulnerable to hidden terminals without RTS/CTS" },
  { name: "MACA & MACAW", category: "Classic", author: "Karn 1990 / Bharghavan 1994", obj: "Solve hidden terminals & improve wireless reliability", mech: "MACA: RTS/CTS handshake. MACAW: Adds link-layer ACK and DS (Data Sending) frame.", formula: "RTS → CTS → DS → DATA → ACK", pro: "Eliminates hidden terminal collisions", con: "Control packet overhead" },
  { name: "TRAMA", category: "Contention-Free", author: "Rajendran et al. 2003", obj: "Traffic-adaptive TDMA assigning slots only to active senders", mech: "NP (2-hop map), SEP (bitmaps), AEA hash prio(i,t)=hash(i⊕t). Inactive nodes sleep.", formula: "prio(i, t) = hash(i ⊕ t)", pro: "High sleep time, zero data collision", con: "Signaling slot overhead" },
  { name: "Y-MAC", category: "Contention-Free", author: "Kim et al. 2008", obj: "Multi-channel TDMA protocol with receiver-driven unicast slots", mech: "Receiver listens at slot start. Senders contend with preamble. Channel hopping sequence under bursts.", formula: "Multi-channel hopping sequence", pro: "High parallel throughput", con: "Fixed slot allocations" },
  { name: "DESYNC-TDMA", category: "Contention-Free", author: "Degesys et al. 2007", obj: "Self-organizing TDMA without global clock", mech: "Ring oscillators jump to midpoint of neighbor firings.", formula: "φ_mid = φ_i + ½(Δ_{i+1} - Δ_i) mod 1", pro: "No global clock; auto-scales to node counts", con: "Initial convergence firing messages" },
  { name: "LEACH", category: "Contention-Free", author: "Heinzelman et al. 2002", obj: "Cluster head rotation and local aggregation to evenly distribute energy", mech: "Setup: CH self-election via P_i(t), ADV broadcast, Join-REQ. Steady: Intra-cluster TDMA, inter-cluster CDMA/DSSS.", formula: "P_i(t) = k / [N - k * (r mod (N/k))]", pro: "8x lifetime extension, in-network fusion", con: "Single-hop CH to Base Station not scalable" },
  { name: "PAMAS", category: "Contention-Based", author: "Singh & Raghavendra 1998", obj: "Eliminate energy waste caused by overhearing", mech: "Dual channels (Data + Control). Nodes sleep during neighbor transmissions. Probe frames on wake.", formula: "Two physical radios", pro: "Eliminates overhearing in dense networks", con: "Requires two radios" },
  { name: "S-MAC", category: "Contention-Based", author: "Ye et al. 2002", obj: "Synchronized duty cycling", mech: "Periodic Listen and Sleep states. SYNC packet exchange. Overhearing avoidance via RTS/CTS sleeping.", formula: "Listen = SYNC + DATA sub-intervals", pro: "High sleep energy savings", con: "Multi-hop sleep delay" },
  { name: "T-MAC", category: "Contention-Based", author: "Van Dam & Langendoen 2003", obj: "Adaptive duty cycle with timeout", mech: "Variable active period ends after idle timeout TA. Solves Early Sleeping via FRTS and dummy DS packets.", formula: "Active timeout = TA", pro: "Adapts to bursty traffic", con: "Early sleeping problem" },
  { name: "Z-MAC", category: "Hybrid", author: "Rhee et al. 2005", obj: "Combines CSMA for low traffic and TDMA for high traffic", mech: "DRAND 2-hop slotting. Local frame TF=2^a. Owner backoff [0,To], non-owner [To,Tno]. ECN triggers HCL mode (pure TDMA).", formula: "2^(a-1) ≤ F_i < 2^a - 1 | TF_i = 2^a", pro: "High throughput, low latency", con: "Setup phase overhead" }
];

// -------------------------------------------------------------------------
// LECTURE NOTES CONTROLLER
// -------------------------------------------------------------------------
let currentLecKey = 'lec1';

function initLectureNav() {
  const lectures = currentUnit === 'unit4' ? UNIT4_LECTURES : UNIT3_LECTURES;
  const navGrid = document.getElementById('lecture-nav-grid');
  const keys = Object.keys(lectures);
  if (!lectures[currentLecKey]) currentLecKey = keys[0];

  navGrid.innerHTML = keys.map(k => {
    const lec = lectures[k];
    const isSelected = k === currentLecKey;
    const activeColor = currentUnit === 'unit4' ? 'bg-amber-950/80 border-amber-500 text-amber-200 shadow-lg' : 'bg-sky-950/80 border-sky-500 text-sky-200 shadow-lg';
    return `
      <button onclick="selectLecture('${k}')" class="p-3.5 rounded-2xl border text-left transition-all ${isSelected ? activeColor : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-white'}">
        <div class="text-[10px] font-mono uppercase tracking-wider text-slate-400 mb-1">Lecture Part</div>
        <div class="text-xs sm:text-sm font-bold text-white line-clamp-1">${lec.title.split(':')[0]}</div>
      </button>
    `;
  }).join('');

  renderLectureContent();
}

function selectLecture(k) {
  currentLecKey = k;
  initLectureNav();
}

function renderLectureContent() {
  const lectures = currentUnit === 'unit4' ? UNIT4_LECTURES : UNIT3_LECTURES;
  const lec = lectures[currentLecKey] || Object.values(lectures)[0];
  const card = document.getElementById('lecture-content-card');

  let html = `
    <div>
      <div class="text-xs font-mono uppercase tracking-wider text-amber-400 mb-1">
        ${currentUnit.toUpperCase()} Comprehensive Curriculum
      </div>
      <h2 class="text-2xl font-black text-white">${lec.title}</h2>
    </div>
    <div class="space-y-6">
  `;

  lec.sections.forEach(sec => {
    html += `
      <div class="pt-4 border-t border-slate-800 space-y-2">
        <h3 class="text-base font-bold text-amber-300">▶ ${sec.heading}</h3>
        <ul class="text-xs text-slate-300 space-y-1.5 list-disc pl-5 leading-relaxed font-sans">
          ${sec.items.map(it => `<li>${it}</li>`).join('')}
        </ul>
        ${sec.formula ? `<div class="bg-slate-950 p-3 rounded-xl border border-slate-800 font-mono text-xs text-amber-300 mt-2">${sec.formula}</div>` : ''}
      </div>
    `;
  });

  html += `</div>`;
  card.innerHTML = html;
}

// -------------------------------------------------------------------------
// PROTOCOL MATRIX CONTROLLER
// -------------------------------------------------------------------------
let currentMatrixCategory = 'All';

function renderMatrixView() {
  const protocols = currentUnit === 'unit4' ? UNIT4_PROTOCOLS : UNIT3_PROTOCOLS;
  const search = document.getElementById('matrix-search-input').value.toLowerCase();
  
  // Extract unique categories
  const categories = ['All', ...new Set(protocols.map(p => p.category))];
  const catBar = document.getElementById('matrix-categories-bar');
  catBar.innerHTML = categories.map(cat => `
    <button onclick="setMatrixFilter('${cat}')" class="px-3 py-1.5 text-xs font-semibold rounded-lg transition ${currentMatrixCategory === cat ? (currentUnit === 'unit4' ? 'bg-amber-600 text-white' : 'bg-sky-600 text-white') : 'text-slate-400 hover:text-white'}">
      ${cat}
    </button>
  `).join('');

  const container = document.getElementById('matrix-cards-container');
  const filtered = protocols.filter(p => {
    const matchesCat = currentMatrixCategory === 'All' || p.category === currentMatrixCategory;
    const matchesSearch = p.name.toLowerCase().includes(search) || p.author.toLowerCase().includes(search) || p.obj.toLowerCase().includes(search) || p.mech.toLowerCase().includes(search);
    return matchesCat && matchesSearch;
  });

  container.innerHTML = filtered.map(p => {
    const badgeColor = p.category.includes('Centric') || p.category.includes('Free')
      ? 'bg-emerald-950/60 border-emerald-500 text-emerald-300'
      : p.category.includes('Reactive') || p.category.includes('Based')
      ? 'bg-sky-950/60 border-sky-500 text-sky-300'
      : 'bg-amber-950/60 border-amber-500 text-amber-300';

    return `
      <div class="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-lg flex flex-col justify-between hover:border-slate-700 transition">
        <div>
          <div class="flex justify-between items-start mb-2">
            <div>
              <h4 class="text-lg font-bold text-white">${p.name}</h4>
              <span class="text-xs text-slate-400 font-mono">${p.author}</span>
            </div>
            <span class="text-[10px] font-bold border px-2.5 py-0.5 rounded-full ${badgeColor}">${p.category}</span>
          </div>
          <p class="text-xs font-medium text-slate-300 mt-2">${p.obj}</p>
          <div class="mt-3 p-2.5 bg-slate-950 rounded-xl border border-slate-800 text-xs text-slate-400 leading-relaxed">
            <strong class="text-slate-300">Mechanism:</strong> ${p.mech}
          </div>
          ${p.formula ? `<div class="mt-2 p-2 bg-slate-950 rounded-lg border border-slate-800 font-mono text-[11px] text-amber-300">${p.formula}</div>` : ''}
          <div class="mt-3 grid grid-cols-2 gap-2 text-[11px]">
            <div class="bg-emerald-950/20 border border-emerald-900/40 p-2 rounded-lg text-slate-300">
              <strong class="text-emerald-400 block mb-0.5">✓ Advantage</strong> ${p.pro}
            </div>
            <div class="bg-rose-950/20 border border-rose-900/40 p-2 rounded-lg text-slate-300">
              <strong class="text-rose-400 block mb-0.5">✕ Limitation</strong> ${p.con}
            </div>
          </div>
        </div>
      </div>
    `;
  }).join('');
}

function setMatrixFilter(cat) {
  currentMatrixCategory = cat;
  renderMatrixView();
}

// -------------------------------------------------------------------------
// SIMULATORS CONTROLLER
// -------------------------------------------------------------------------
let currentSimKey = 'gpsr';

function initSimulatorsTab() {
  const isUnit4 = currentUnit === 'unit4';
  const tabBar = document.getElementById('simulators-tab-bar');

  if (isUnit4) {
    tabBar.innerHTML = `
      <button onclick="selectSim('gpsr')" id="sim-tab-gpsr" class="sim-tab-btn px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold bg-amber-600 text-white shadow-md">
        🧭 GPSR Greedy Forwarding & Right-Hand Void Router
      </button>
      <button onclick="selectSim('spin')" id="sim-tab-spin" class="sim-tab-btn px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold text-slate-400 hover:text-white">
        📡 SPIN 3-Way Handshake vs Diffusion
      </button>
      <button onclick="selectSim('gear')" id="sim-tab-gear" class="sim-tab-btn px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold text-slate-400 hover:text-white">
        ⚡ GEAR Cost & Void Circumvention
      </button>
      <button onclick="selectSim('mmspeed')" id="sim-tab-mmspeed" class="sim-tab-btn px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold text-slate-400 hover:text-white">
        🚀 MMSPEED Timeliness & TRP Reliability
      </button>
    `;
    if (!['gpsr', 'spin', 'gear', 'mmspeed'].includes(currentSimKey)) currentSimKey = 'gpsr';
  } else {
    tabBar.innerHTML = `
      <button onclick="selectSim('hidden')" id="sim-tab-hidden" class="sim-tab-btn px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold bg-sky-600 text-white shadow-md">
        🌐 Hidden & Exposed Terminals
      </button>
      <button onclick="selectSim('desync')" id="sim-tab-desync" class="sim-tab-btn px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold text-slate-400 hover:text-white">
        🔄 DESYNC-TDMA Oscillator Ring
      </button>
      <button onclick="selectSim('leach')" id="sim-tab-leach" class="sim-tab-btn px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold text-slate-400 hover:text-white">
        📡 LEACH Clustering Simulator
      </button>
      <button onclick="selectSim('zmac')" id="sim-tab-zmac" class="sim-tab-btn px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold text-slate-400 hover:text-white">
        ⚡ Z-MAC Frame & ECN Calculator
      </button>
    `;
    if (!['hidden', 'desync', 'leach', 'zmac'].includes(currentSimKey)) currentSimKey = 'hidden';
  }
  renderActiveSimulator();
}

function selectSim(key) {
  currentSimKey = key;
  document.querySelectorAll('.sim-tab-btn').forEach(btn => {
    btn.classList.remove('bg-amber-600', 'bg-sky-600', 'text-white', 'shadow-md');
    btn.classList.add('text-slate-400');
  });
  const activeBtn = document.getElementById('sim-tab-' + key);
  activeBtn.classList.remove('text-slate-400');
  activeBtn.classList.add(currentUnit === 'unit4' ? 'bg-amber-600' : 'bg-sky-600', 'text-white', 'shadow-md');
  renderActiveSimulator();
}

function renderActiveSimulator() {
  const box = document.getElementById('simulator-content-box');

  if (currentSimKey === 'gpsr') {
    box.innerHTML = `
      <div class="bg-slate-900 border border-slate-800 rounded-2xl p-6 text-white shadow-xl space-y-6">
        <div class="flex justify-between items-center">
          <div>
            <h3 class="text-xl font-bold text-amber-400">GPSR Greedy Forwarding & Right-Hand Rule Perimeter Router</h3>
            <p class="text-slate-400 text-xs">Simulate how GPSR detects a void and circumvents it along the perimeter using the Right-Hand Rule.</p>
          </div>
          <button onclick="stepGpsrSim()" class="bg-amber-600 hover:bg-amber-500 px-4 py-2 rounded-xl text-xs font-bold text-white shadow">
            ▶ Step GPSR Forwarding (<span id="gpsr-step-tag">Step 1/4</span>)
          </button>
        </div>

        <div class="relative bg-slate-950 rounded-xl p-8 border border-slate-800 min-h-[260px] flex items-center justify-around">
          <div class="flex flex-col items-center">
            <div id="gpsr-node-x" class="w-14 h-14 rounded-full border-2 border-amber-500 bg-amber-950 flex items-center justify-center font-bold text-amber-200">X (Local)</div>
            <span class="text-[11px] font-mono text-slate-400 mt-1">Sender Node</span>
          </div>

          <div class="flex flex-col items-center">
            <div id="gpsr-void-box" class="w-24 h-24 rounded-2xl border-2 border-dashed border-rose-500/50 bg-rose-950/20 flex flex-col items-center justify-center font-bold text-rose-300 text-xs">
              <span>VOID AREA</span>
              <span class="text-[9px] text-slate-400 font-normal">No closer neighbor</span>
            </div>
          </div>

          <div class="flex flex-col items-center">
            <div id="gpsr-node-y" class="w-12 h-12 rounded-full border-2 border-slate-600 bg-slate-800 flex items-center justify-center font-bold text-slate-300">Y</div>
            <span class="text-[11px] font-mono text-slate-400 mt-1">Perimeter Node</span>
          </div>

          <div class="flex flex-col items-center">
            <div class="w-14 h-14 rounded-full border-2 border-emerald-500 bg-emerald-950 flex items-center justify-center font-bold text-emerald-200">Dest</div>
            <span class="text-[11px] font-mono text-slate-400 mt-1">Destination</span>
          </div>
        </div>

        <div id="gpsr-status-box" class="p-4 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-300 leading-relaxed">
          Step 1: Node X has data for Destination. Node X is closer to Destination than its neighbors Y and W. Greedy forwarding fails because of the VOID!
        </div>
      </div>
    `;
    gpsrStep = 0;
  } else if (currentSimKey === 'gear') {
    box.innerHTML = `
      <div class="bg-slate-900 border border-slate-800 rounded-2xl p-6 text-white shadow-xl space-y-6">
        <h3 class="text-xl font-bold text-amber-400">GEAR Estimated & Learned Cost Calculator</h3>
        <p class="text-slate-400 text-xs">Formula: <code class="text-amber-300 font-mono">c(N_i, R) = α * d(N_i, R) + (1 - α) * e(N_i)</code> and <code class="text-amber-300 font-mono">h(N, R) = h(N_min, R) + C(N, N_min)</code></p>
        
        <div class="grid grid-cols-1 sm:grid-cols-3 gap-4 bg-slate-950 p-4 rounded-xl border border-slate-800 text-xs">
          <div>
            <label class="block text-slate-400 mb-1 font-semibold">Tunable Weight α: <span id="gear-alpha-val" class="text-amber-400">0.5</span></label>
            <input type="range" min="0" max="1" step="0.1" value="0.5" oninput="updateGearCalc()" id="gear-alpha" class="w-full accent-amber-500 cursor-pointer" />
          </div>
          <div>
            <label class="block text-slate-400 mb-1 font-semibold">Normalized Distance d: <span id="gear-dist-val" class="text-sky-400">0.6</span></label>
            <input type="range" min="0.1" max="1" step="0.1" value="0.6" oninput="updateGearCalc()" id="gear-dist" class="w-full accent-sky-500 cursor-pointer" />
          </div>
          <div>
            <label class="block text-slate-400 mb-1 font-semibold">Consumed Energy e: <span id="gear-energy-val" class="text-rose-400">0.4</span></label>
            <input type="range" min="0.1" max="1" step="0.1" value="0.4" oninput="updateGearCalc()" id="gear-energy" class="w-full accent-rose-500 cursor-pointer" />
          </div>
        </div>

        <div class="bg-slate-950 p-5 rounded-xl border border-slate-800 flex justify-between items-center">
          <div>
            <span class="text-xs text-slate-400 uppercase tracking-wider font-bold block mb-1">Calculated Estimated Cost</span>
            <div class="text-3xl font-mono font-black text-amber-300" id="gear-cost-output">0.500</div>
          </div>
          <div class="text-right text-xs text-slate-400 max-w-sm">
            When in a hole, GEAR adds neighbor transmission cost C(N, N_min) to learn the hole route and avoid getting stuck on subsequent packets.
          </div>
        </div>
      </div>
    `;
    updateGearCalc();
  } else if (currentSimKey === 'spin') {
    box.innerHTML = `
      <div class="bg-slate-900 border border-slate-800 rounded-2xl p-6 text-white shadow-xl space-y-6">
        <h3 class="text-xl font-bold text-sky-400">SPIN 3-Way Handshake vs Directed Diffusion</h3>
        <p class="text-slate-400 text-xs">Observe the fundamental difference: SPIN is Source-Advertised (ADV → REQ → DATA), while Directed Diffusion is Sink-Queried (Interest → Gradient → Reinforcement).</p>
        
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div class="bg-slate-950 p-5 rounded-2xl border border-slate-800 space-y-3">
            <span class="text-xs font-bold font-mono text-sky-400 uppercase">SPIN-PP 3-Way Handshake</span>
            <div class="space-y-2 text-xs">
              <div class="p-2.5 rounded-lg bg-sky-950/60 border border-sky-800 text-sky-200">1. Node A broadcasts <strong>ADV(meta-data)</strong> to neighbors.</div>
              <div class="p-2.5 rounded-lg bg-indigo-950/60 border border-indigo-800 text-indigo-200">2. Neighbor checks cache; if needed, replies with <strong>REQ</strong>.</div>
              <div class="p-2.5 rounded-lg bg-emerald-950/60 border border-emerald-800 text-emerald-200">3. Node A transmits <strong>DATA(payload)</strong> exclusively to requester.</div>
            </div>
          </div>

          <div class="bg-slate-950 p-5 rounded-2xl border border-slate-800 space-y-3">
            <span class="text-xs font-bold font-mono text-purple-400 uppercase">Directed Diffusion Pipeline</span>
            <div class="space-y-2 text-xs">
              <div class="p-2.5 rounded-lg bg-purple-950/60 border border-purple-800 text-purple-200">1. Sink floods <strong>Interest(attribute-value pairs)</strong>.</div>
              <div class="p-2.5 rounded-lg bg-amber-950/60 border border-amber-800 text-amber-200">2. Nodes establish <strong>Gradients</strong> pointing toward the sink.</div>
              <div class="p-2.5 rounded-lg bg-emerald-950/60 border border-emerald-800 text-emerald-200">3. Sink <strong>Reinforces</strong> the empirical lowest-delay path.</div>
            </div>
          </div>
        </div>
      </div>
    `;
  } else if (currentSimKey === 'mmspeed') {
    box.innerHTML = `
      <div class="bg-slate-900 border border-slate-800 rounded-2xl p-6 text-white shadow-xl space-y-6">
        <h3 class="text-xl font-bold text-emerald-400">MMSPEED Timeliness & Reliability Calculator</h3>
        <p class="text-slate-400 text-xs">Calculate required delivery speed <code class="text-emerald-300 font-mono">ReqSpeed = dist / deadline</code> and Total Reaching Probability <code class="text-emerald-300 font-mono">TRP = 1 - (1 - TRP)*(1 - RP)</code>.</p>
        
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-slate-950 p-4 rounded-xl border border-slate-800 text-xs">
          <div>
            <label class="block text-slate-400 mb-1">Distance (meters): <strong id="mm-dist-val" class="text-sky-400">100m</strong></label>
            <input type="range" min="20" max="500" value="100" id="mm-dist" oninput="updateMmspeedCalc()" class="w-full accent-sky-500 cursor-pointer" />
          </div>
          <div>
            <label class="block text-slate-400 mb-1">End-to-End Deadline (ms): <strong id="mm-dead-val" class="text-amber-400">50ms</strong></label>
            <input type="range" min="10" max="200" value="50" id="mm-dead" oninput="updateMmspeedCalc()" class="w-full accent-amber-500 cursor-pointer" />
          </div>
        </div>

        <div class="bg-slate-950 p-5 rounded-xl border border-slate-800 flex justify-between items-center font-mono">
          <div>
            <span class="text-xs text-slate-400 uppercase font-sans font-bold block mb-1">Required Speed</span>
            <div class="text-2xl font-bold text-emerald-300" id="mm-speed-output">2.00 m/ms (2000 m/s)</div>
          </div>
          <div class="text-right">
            <span class="text-xs text-slate-400 uppercase font-sans font-bold block mb-1">Assigned Speed Layer</span>
            <div class="text-sm font-bold text-amber-400" id="mm-layer-output">Layer 2 (SetSpeed ≥ 2.0)</div>
          </div>
        </div>
      </div>
    `;
    updateMmspeedCalc();
  } else {
    // Unit 3 Simulators fallback
    box.innerHTML = `<div class="p-6 bg-slate-900 border border-slate-800 rounded-2xl text-xs text-slate-300">Unit 3 Simulators Active (Hidden/Exposed, DESYNC Ring, LEACH, Z-MAC). Switch above to test.</div>`;
  }
}

// GPSR Stepper
let gpsrStep = 0;
function stepGpsrSim() {
  gpsrStep = (gpsrStep + 1) % 4;
  document.getElementById('gpsr-step-tag').textContent = `Step ${gpsrStep + 1}/4`;
  const status = document.getElementById('gpsr-status-box');
  const nodeY = document.getElementById('gpsr-node-y');

  if (gpsrStep === 0) {
    status.innerHTML = "Step 1: Greedy forwarding fails at Node X because no neighbor is closer to Destination than X itself.";
    nodeY.className = "w-12 h-12 rounded-full border-2 border-slate-600 bg-slate-800 flex items-center justify-center font-bold text-slate-300";
  } else if (gpsrStep === 1) {
    status.innerHTML = "Step 2: Node X detects VOID! GPSR switches from Greedy Mode to Perimeter Mode.";
  } else if (gpsrStep === 2) {
    status.innerHTML = "Step 3: Node X applies the Right-Hand Rule: sweeps counter-clockwise to find next edge in the planar graph, selecting Node Y!";
    nodeY.className = "w-12 h-12 rounded-full border-2 border-amber-500 bg-amber-950 flex items-center justify-center font-bold text-amber-200 animate-pulse";
  } else {
    status.innerHTML = "Step 4: Packet traverses planar perimeter around the void until reaching a node closer to Destination than X, where GPSR safely resumes Greedy Forwarding!";
    nodeY.className = "w-12 h-12 rounded-full border-2 border-emerald-500 bg-emerald-950 flex items-center justify-center font-bold text-emerald-200";
  }
}

function updateGearCalc() {
  const alpha = Number(document.getElementById('gear-alpha').value);
  const d = Number(document.getElementById('gear-dist').value);
  const e = Number(document.getElementById('gear-energy').value);
  document.getElementById('gear-alpha-val').textContent = alpha.toFixed(1);
  document.getElementById('gear-dist-val').textContent = d.toFixed(1);
  document.getElementById('gear-energy-val').textContent = e.toFixed(1);

  const cost = alpha * d + (1 - alpha) * e;
  document.getElementById('gear-cost-output').textContent = cost.toFixed(3);
}

function updateMmspeedCalc() {
  const dist = Number(document.getElementById('mm-dist').value);
  const dead = Number(document.getElementById('mm-dead').value);
  document.getElementById('mm-dist-val').textContent = dist + 'm';
  document.getElementById('mm-dead-val').textContent = dead + 'ms';

  const speed = dist / dead;
  document.getElementById('mm-speed-output').textContent = `${speed.toFixed(2)} m/ms (${(speed * 1000).toFixed(0)} m/s)`;
  const layer = speed > 3 ? 'Layer 4 (High Speed)' : speed > 1.5 ? 'Layer 3' : 'Layer 2';
  document.getElementById('mm-layer-output').textContent = layer;
}

// -------------------------------------------------------------------------
// FLASHCARDS CONTROLLER
// -------------------------------------------------------------------------
const UNIT4_FLASHCARDS = [
  { cat: "Formulas", q: "Expected Transmission Time (ETT) Formula", a: "ETT = ETX * (S / B), where S is average packet size and B is link bandwidth." },
  { cat: "Formulas", q: "GEAR Estimated Cost Equation", a: "c(N_i, R) = α * d(N_i, R) + (1 - α) * e(N_i), where d is normalized distance to centroid and e is consumed energy." },
  { cat: "Formulas", q: "MMSPEED Required Speed Formula", a: "ReqSpeed(x) = dist_{s,d}(x) / deadline(x)" },
  { cat: "Formulas", q: "MMSPEED Total Reaching Probability (TRP)", a: "TRP = 1 - (1 - TRP) * (1 - RP_{i,j}^d)" },
  { cat: "Key Concepts", q: "Three Deficiencies of Classic Flooding (Heinzelman 1999)", a: "1. Implosion (duplicate packets)\n2. Overlap (sensors in region Y send identical data)\n3. Resource Blindness (ignores battery levels)" },
  { cat: "Key Concepts", q: "What is the Right-Hand Rule in GPSR?", a: "Traverses edges sequentially counterclockwise from incoming edge; traverses interior clockwise and exterior counterclockwise to navigate around voids on planar graphs." },
  { cat: "Key Concepts", q: "Difference between SPIN and Directed Diffusion", a: "SPIN is Source-Advertised (push); Directed Diffusion is Sink-Queried (pull) using Interests and Gradients." },
  { cat: "Protocols", q: "What are Multipoint Relays (MPRs) in OLSR?", a: "A selected minimal subset of 1-hop symmetric neighbors that covers all 2-hop neighbors. Only MPRs forward topology control packets." },
  { cat: "Protocols", q: "How does PEGASIS aggregate sensor data?", a: "Constructs a linear greedy chain where each node transmits only to its nearest chain neighbor; data aggregates sequentially until the chain leader relays to the base station." },
  { cat: "Protocols", q: "What is Back-Pressure Rerouting in SPEED?", a: "When downstream nodes are congested (delay > D), packet drops force upstream nodes to detect increased delay and deflect traffic around the hot spot." },
  { cat: "Data Aggregation", q: "Core Axiom of Data Aggregation in WSNs", a: "Communication consumes considerably more energy than computation! In-network processing saves orders of magnitude in battery power." },
  { cat: "Data Aggregation", q: "Four Efficacy Metrics of Data Aggregation", a: "1. Accuracy (difference from true physical value)\n2. Completeness (% of readings included)\n3. Latency (delay waiting for inputs)\n4. Message Overhead" }
];

let fcIndex = 0, fcFlipped = false, fcMastered = [];

function initFlashcards() {
  const cards = currentUnit === 'unit4' ? UNIT4_FLASHCARDS : UNIT3_FLASHCARDS;
  if (fcIndex >= cards.length) fcIndex = 0;

  const cats = ['All', ...new Set(cards.map(c => c.cat))];
  document.getElementById('fc-category-filters').innerHTML = cats.map(cat => `
    <span class="px-2.5 py-1 text-xs rounded-lg bg-slate-800 text-slate-300 font-mono">${cat}</span>
  `).join('');

  renderFlashcardFace();
}

function renderFlashcardFace() {
  const cards = currentUnit === 'unit4' ? UNIT4_FLASHCARDS : UNIT3_FLASHCARDS;
  const card = cards[fcIndex];

  document.getElementById('fc-counter-label').textContent = `Card ${fcIndex + 1} of ${cards.length}`;
  document.getElementById('fc-mastered-label').textContent = `✓ ${fcMastered.length} Mastered`;
  document.getElementById('fc-card-badge').textContent = card.cat;
  document.getElementById('fc-question-text').textContent = card.q;
  document.getElementById('fc-answer-text').textContent = card.a;
  document.getElementById('fc-face-status').textContent = fcFlipped ? 'Back' : 'Front';

  document.getElementById('fc-front-side').classList.toggle('hidden', fcFlipped);
  document.getElementById('fc-back-side').classList.toggle('hidden', !fcFlipped);

  const isM = fcMastered.includes(fcIndex);
  const btn = document.getElementById('fc-master-action-btn');
  btn.className = isM
    ? 'text-xs font-semibold px-3 py-1.5 rounded-lg border bg-emerald-950 border-emerald-500 text-emerald-300'
    : 'text-xs font-semibold px-3 py-1.5 rounded-lg border bg-slate-800/60 border-slate-700 text-slate-400';
  btn.textContent = isM ? '✓ Mastered!' : 'Mark as Mastered';
}

function flipActiveCard() { fcFlipped = !fcFlipped; renderFlashcardFace(); }
function nextFlashcard() {
  fcFlipped = false;
  const len = (currentUnit === 'unit4' ? UNIT4_FLASHCARDS : UNIT3_FLASHCARDS).length;
  fcIndex = (fcIndex + 1) % len;
  renderFlashcardFace();
}
function prevFlashcard() {
  fcFlipped = false;
  const len = (currentUnit === 'unit4' ? UNIT4_FLASHCARDS : UNIT3_FLASHCARDS).length;
  fcIndex = (fcIndex - 1 + len) % len;
  renderFlashcardFace();
}
function shuffleFlashcards() {
  const cards = currentUnit === 'unit4' ? UNIT4_FLASHCARDS : UNIT3_FLASHCARDS;
  cards.sort(() => Math.random() - 0.5);
  fcIndex = 0; fcFlipped = false;
  renderFlashcardFace();
}
function toggleMasterFlashcard() {
  if (fcMastered.includes(fcIndex)) fcMastered = fcMastered.filter(x => x !== fcIndex);
  else fcMastered.push(fcIndex);
  renderFlashcardFace();
}

// -------------------------------------------------------------------------
// UNIVERSITY Q&A BANK CONTROLLER
// -------------------------------------------------------------------------
const UNIT4_QA_2MARKS = [
  { q: "Define Routing in Wireless Sensor Networks.", a: "Routing is the process of establishing paths from a source sensor node to a sink (gateway) across one or more intermediate relay nodes." },
  { q: "What is Implosion in classic flooding?", a: "Implosion occurs when a node receives duplicate copies of the exact same packet from multiple neighboring nodes, wasting bandwidth and energy." },
  { q: "What is the Overlap problem in sensor networks?", a: "Colocated sensors monitor overlapping physical areas (region Y) and both forward identical sensed data to the same receiver, causing redundant transmission." },
  { q: "How does SPIN overcome resource blindness?", a: "Each SPIN node incorporates an internal Resource Manager that monitors current battery levels and curtails participation in routing handshakes when energy drops below a threshold." },
  { q: "State the three phases of Directed Diffusion.", a: "1. Interest Propagation (gradients established); 2. Initial Exploratory Data Delivery; 3. Path Reinforcement (high-rate path selection)." },
  { q: "How does GBR balance traffic across the network?", a: "Using three schemes: Stochastic (random choice among equal gradients), Energy-based (low battery nodes raise height), and Stream-based (avoids loaded nodes)." },
  { q: "What are Multipoint Relays (MPRs) in OLSR?", a: "A minimal set of 1-hop symmetric neighbors selected to cover all 2-hop symmetric neighbors. Only MPRs retransmit topology control messages." },
  { q: "How does GPSR recover from a dead-end void?", a: "It switches to Perimeter Mode, using the Right-Hand Rule to navigate planar graphs (RNG / Gabriel Graph) until reaching a node closer to the destination." },
  { q: "State the estimated cost equation in GEAR.", a: "c(N_i, R) = α * d(N_i, R) + (1 - α) * e(N_i), where d is normalized distance to centroid, e is consumed energy, and α is a tunable weight." },
  { q: "Define Expected Transmission Count (ETX).", a: "ETX is the expected number of MAC transmissions required to successfully deliver a packet over a wireless link (ETX = 1 / (d_f * d_r))." },
  { q: "Why is communication more energy-consuming than computation in WSNs?", a: "Transmitting a single bit over radio consumes roughly the same energy as executing thousands of CPU instructions, making in-network data aggregation essential." },
  { q: "Differentiate between lossy and lossless in-network data aggregation.", a: "Lossy aggregation combines and compresses readings to reduce packet byte size (e.g. averaging). Lossless aggregation merges distinct packets into a single frame without altering raw data values." }
];

let currentQaTab = '2marks';

function renderQaView() {
  const isUnit4 = currentUnit === 'unit4';
  const shortList = isUnit4 ? UNIT4_QA_2MARKS : QA_2MARKS;
  const grid = document.getElementById('qa-2marks-grid');

  grid.innerHTML = shortList.map((item, idx) => `
    <div class="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-lg flex flex-col justify-between">
      <div>
        <span class="text-xs font-mono font-bold text-amber-400 bg-amber-950/80 px-2 py-0.5 rounded border border-amber-800">Q${idx + 1} • [2 MARKS]</span>
        <h4 class="text-sm font-bold text-white mt-2 mb-2">${item.q}</h4>
        <p class="text-xs text-slate-300 bg-slate-950 p-3 rounded-xl border border-slate-800 leading-relaxed font-sans">${item.a}</p>
      </div>
    </div>
  `).join('');

  const essaysContainer = document.getElementById('qa-10marks-list');
  if (isUnit4) {
    essaysContainer.innerHTML = `
      <div class="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-3">
        <h4 class="text-base font-bold text-amber-400">Essay 1: SPIN vs Directed Diffusion Data-Centric Routing [16 Marks]</h4>
        <div class="text-xs text-slate-300 space-y-2 leading-relaxed">
          <p><strong>1. SPIN Protocols:</strong> Meta-data negotiation (x < X), Resource manager to prevent resource blindness. 3-way handshake: ADV → REQ → DATA. Variants: SPIN-PP, SPIN-EC, SPIN-BC (random timers), SPIN-RL.</p>
          <p><strong>2. Directed Diffusion:</strong> Attribute-value naming. Three phases: Interest propagation, Gradient setup, Exploratory data delivery, and empirical Path Reinforcement.</p>
          <p><strong>3. Critical Differences:</strong> SPIN is source-advertised (push); Directed Diffusion is sink-queried (pull). Directed diffusion supports in-network aggregation directly along gradient paths.</p>
        </div>
      </div>

      <div class="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-3">
        <h4 class="text-base font-bold text-amber-400">Essay 2: GPSR Location-Based Routing & Perimeter Void Traversal [16 Marks]</h4>
        <div class="text-xs text-slate-300 space-y-2 leading-relaxed">
          <p><strong>1. Greedy Forwarding:</strong> Selects neighbor closest to destination. Requires only 1-hop neighbor locations.</p>
          <p><strong>2. Void / Dead-End Problem:</strong> When a local node has no neighbor closer to destination than itself.</p>
          <p><strong>3. Perimeter Mode:</strong> Navigates planar graph (RNG or Gabriel Graph) using the Right-Hand Rule (interior clockwise, exterior counterclockwise) until greedy forwarding can safely resume.</p>
        </div>
      </div>

      <div class="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-3">
        <h4 class="text-base font-bold text-amber-400">Essay 3: Data Aggregation Techniques & Methodologies in WSNs [16 Marks]</h4>
        <div class="text-xs text-slate-300 space-y-2 leading-relaxed">
          <p><strong>1. Motivation:</strong> High data volume, energy optimization. Communication >> Computation energy.</p>
          <p><strong>2. Four Methodologies:</strong> Centralized (single central node), In-Network (lossy size reduction vs lossless merging), Tree-Based (TAG minimum spanning tree), Cluster-Based (LEACH, HEED, CLUDDA).</p>
          <p><strong>3. Query Types:</strong> Simple, Complex (aggregates + subqueries), Event-Driven periodic.</p>
        </div>
      </div>
    `;
  } else {
    essaysContainer.innerHTML = `
      <div class="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-3">
        <h4 class="text-base font-bold text-sky-400">Essay 1: LEACH Protocol Architecture & Formulations [16 Marks]</h4>
        <div class="text-xs text-slate-300 space-y-2">Setup Phase: CH election probability P_i(t), ADV, Join-REQ. Steady-State: Intra-cluster TDMA, inter-cluster CDMA/DSSS. LEACH-C centralized optimization.</div>
      </div>
    `;
  }
}

function setQaTab(tab) {
  currentQaTab = tab;
  document.getElementById('qa-tab-btn-2').className = tab === '2marks' ? 'px-4 py-2 text-xs font-bold rounded-lg bg-amber-600 text-white' : 'px-4 py-2 text-xs font-bold rounded-lg text-slate-400';
  document.getElementById('qa-tab-btn-10').className = tab === '10marks' ? 'px-4 py-2 text-xs font-bold rounded-lg bg-amber-600 text-white' : 'px-4 py-2 text-xs font-bold rounded-lg text-slate-400';
  document.getElementById('qa-2marks-grid').classList.toggle('hidden', tab !== '2marks');
  document.getElementById('qa-10marks-list').classList.toggle('hidden', tab !== '10marks');
}

// -------------------------------------------------------------------------
// MOCK EXAM QUIZ CONTROLLER
// -------------------------------------------------------------------------
const UNIT4_QUIZ = [
  { q: "What is the primary cause of the Implosion problem in flooding?", opts: ["Packet corruptions in physical layer", "Duplicated packets sent to the same node by multiple neighbors", "Nodes running out of battery", "Carrier sense timeout"], ans: 1, exp: "Implosion occurs when multiple neighbors rebroadcast the exact same packet to a common node." },
  { q: "What is a mandatory requirement for meta-data in the SPIN protocol?", opts: ["Must be encrypted with AES", "Size of meta-data x must be less than raw data X (x < X)", "Must contain GPS coordinates", "Must exceed 256 bytes"], ans: 1, exp: "Meta-data negotiation is only beneficial if meta-data is significantly smaller than actual payload." },
  { q: "How are data items named in Directed Diffusion?", opts: ["32-bit IP addresses", "Attribute-value pairs", "MAC addresses", "Random hash keys"], ans: 1, exp: "Directed diffusion uses attribute-value pairs (e.g. type=vehicle, interval=20ms) to name data." },
  { q: "What is the function of Multipoint Relays (MPRs) in OLSR?", opts: ["Only MPRs are allowed to forward control messages", "They act as base stations", "They perform CDMA decoding", "They calculate clock drift"], ans: 0, exp: "Only MPRs retransmit topology control messages, eliminating broadcast storm duplicates." },
  { q: "Which protocol incorporates the complete route in the packet header?", opts: ["AODV", "DSR (Dynamic Source Routing)", "DSDV", "LEACH"], ans: 1, exp: "DSR uses Source Routing where the full sequence of intermediate hops is stored in the packet header." },
  { q: "What rule does GPSR use to route around dead-end voids?", opts: ["Left-hand rule", "Right-hand rule", "Dijkstra rule", "Greedy progress rule"], ans: 1, exp: "Perimeter Mode uses the Right-Hand Rule on planar graphs (interior clockwise, exterior counterclockwise)." },
  { q: "In SPEED, how is RelaySpeed computed?", opts: ["(L - L_next) / SendToDelay", "L * SendToDelay", "Bandwidth / ETT", "dist / deadline^2"], ans: 0, exp: "RelaySpeed considers distance progress divided by delay: (L - L_next) / SendToDelay." },
  { q: "What does PEGASIS use to connect all nodes?", opts: ["Star topology", "Single linear greedy chain", "Cluster tree", "Virtual grid"], ans: 1, exp: "PEGASIS organizes all nodes into a linear chain; nodes take turns sending aggregated data to base station." }
];

let quizIndex = 0, quizAnswers = {};

function resetMockQuiz() {
  quizIndex = 0;
  quizAnswers = {};
  renderQuizCard();
}

function renderQuizCard() {
  const questions = currentUnit === 'unit4' ? UNIT4_QUIZ : QUIZ;
  const card = document.getElementById('quiz-active-card');
  const resultCard = document.getElementById('quiz-final-score-card');

  if (quizIndex >= questions.length) {
    let score = 0;
    questions.forEach((q, i) => { if (quizAnswers[i] === q.ans) score++; });
    card.classList.add('hidden');
    resultCard.classList.remove('hidden');
    resultCard.innerHTML = `
      <h3 class="text-2xl font-bold">Diagnostic Complete!</h3>
      <div class="text-4xl font-extrabold text-amber-400 font-mono my-4">${score} / ${questions.length}</div>
      <p class="text-xs text-slate-400 mb-4">Score: ${Math.round((score / questions.length) * 100)}%</p>
      <button onclick="resetMockQuiz()" class="bg-amber-600 hover:bg-amber-500 px-6 py-2.5 rounded-xl font-bold text-sm text-white">Retake Quiz</button>
    `;
    return;
  }

  card.classList.remove('hidden');
  resultCard.classList.add('hidden');
  document.getElementById('quiz-answered-status').textContent = `${Object.keys(quizAnswers).length} / ${questions.length} Answered`;

  const q = questions[quizIndex];
  const hasAnswered = quizAnswers[quizIndex] !== undefined;

  let html = `
    <div class="flex justify-between items-center text-xs text-slate-400 border-b border-slate-800 pb-2 font-mono">
      <span class="text-amber-400 font-bold">QUESTION ${quizIndex + 1} OF ${questions.length}</span>
    </div>
    <h4 class="text-lg font-bold text-white mt-3">${q.q}</h4>
    <div class="space-y-2 mt-4">
  `;

  q.opts.forEach((opt, idx) => {
    let style = "bg-slate-950 border-slate-800 text-slate-300 hover:border-slate-700";
    if (hasAnswered) {
      if (idx === q.ans) style = "bg-emerald-950 border-emerald-500 text-emerald-200 ring-2 ring-emerald-500/20";
      else if (quizAnswers[quizIndex] === idx) style = "bg-rose-950 border-rose-500 text-rose-200 ring-2 ring-rose-500/20";
      else style = "opacity-50 border-slate-800";
    }
    html += `
      <button onclick="pickQuizAnswer(${idx})" ${hasAnswered ? 'disabled' : ''} class="w-full text-left p-3.5 rounded-xl border text-xs sm:text-sm font-medium transition ${style}">
        <strong>${String.fromCharCode(65 + idx)}.</strong> ${opt}
      </button>
    `;
  });

  html += `</div>`;

  if (hasAnswered) {
    html += `
      <div class="p-3.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-slate-300 mt-4">
        <strong class="text-amber-400 block mb-1">Explanation:</strong> ${q.exp}
      </div>
    `;
  }

  html += `
    <div class="flex justify-between items-center pt-4 border-t border-slate-800 mt-4">
      <button onclick="quizIndex = Math.max(0, quizIndex - 1); renderQuizCard();" ${quizIndex === 0 ? 'disabled' : ''} class="px-4 py-2 rounded-xl bg-slate-800 text-xs font-semibold disabled:opacity-40">Previous</button>
      <button onclick="quizIndex++; renderQuizCard();" class="px-4 py-2 rounded-xl bg-amber-600 text-white text-xs font-semibold">${quizIndex < questions.length - 1 ? 'Next' : 'Finish'}</button>
    </div>
  `;

  card.innerHTML = html;
}

function pickQuizAnswer(optIdx) {
  quizAnswers[quizIndex] = optIdx;
  renderQuizCard();
}

// -------------------------------------------------------------------------
// PRINTABLE CRAM SHEET CONTROLLER
// -------------------------------------------------------------------------
function renderCramSheet() {
  const isUnit4 = currentUnit === 'unit4';
  const container = document.getElementById('printable-cram-container');

  if (isUnit4) {
    container.innerHTML = `
      <div class="border-b-2 border-amber-500 pb-3 text-center">
        <h1 class="text-2xl font-black text-amber-400 print:text-amber-800">ECPE39: WSN UNIT-IV NETWORK LAYER & ROUTING CRAM SHEET</h1>
      </div>
      <div class="border border-slate-700 p-4 rounded-xl space-y-2">
        <h3 class="font-bold text-amber-400 uppercase text-xs">⚡ Essential Mathematical Formulas</h3>
        <div class="grid grid-cols-2 gap-2 font-mono text-[11px]">
          <div>• ETT: ETT = ETX * (S / B)</div>
          <div>• GEAR Cost: c(N_i, R) = α * d + (1 - α) * e</div>
          <div>• MMSPEED ReqSpeed: ReqSpeed = dist / deadline</div>
          <div>• MMSPEED TRP: TRP = 1 - (1 - TRP) * (1 - RP_{i,j}^d)</div>
          <div>• SPEED RelaySpeed: (L - L_next) / SendToDelay</div>
          <div>• GBR Gradient: Height_node - Height_neighbor</div>
        </div>
      </div>
    `;
  } else {
    container.innerHTML = `
      <div class="border-b-2 border-sky-500 pb-3 text-center">
        <h1 class="text-2xl font-black text-sky-400 print:text-blue-800">ECPE39: WSN UNIT-III DATA LINK LAYER CRAM SHEET</h1>
      </div>
      <div class="border border-slate-700 p-4 rounded-xl space-y-2">
        <h3 class="font-bold text-amber-400 uppercase text-xs">⚡ Essential Mathematical Formulas</h3>
        <div class="grid grid-cols-2 gap-2 font-mono text-[11px]">
          <div>• LEACH: P_i(t) = k / [N - k*(r mod(N/k))]</div>
          <div>• DESYNC: φ_mid = φ_i + ½(Δ_{i+1} - Δ_i) mod 1</div>
          <div>• Z-MAC: 2^(a-1) ≤ F_i < 2^a - 1, TF_i = 2^a</div>
          <div>• RMAC: T_wakeup(i) = (i - 1)*[size(DATA)+size(ACK)+2*SIFS]</div>
        </div>
      </div>
    `;
  }
}

// -------------------------------------------------------------------------
// INITIALIZATION
// -------------------------------------------------------------------------
setUnit('unit4');
