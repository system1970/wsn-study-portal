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
    container.innerHTML = `
      <div class="border-b-2 border-amber-500 pb-3 text-center">
        <h1 class="text-2xl font-black text-amber-400 print:text-amber-800">ECPE39: WSN UNIT-IV NETWORK LAYER & ROUTING CRAM SHEET (PAGES 1–103)</h1>
        <p class="text-xs text-slate-400 font-mono mt-1">Exhaustive Master Exam Blueprint • Lectures 1, 2, and 3.1</p>
      </div>

      <div class="grid grid-cols-2 gap-3 text-[11px] leading-relaxed">
        <div class="border border-slate-700 p-3 rounded-xl space-y-1.5 bg-slate-900/60">
          <h3 class="font-bold text-amber-400 uppercase text-xs">⚡ 1. Routing Metrics & Formulas (pp. 1–28)</h3>
          <div>• <strong>Minimum Hop:</strong> Smallest relay count; reduces latency/resources, but may overload bottlenecks.</div>
          <div>• <strong>Singh et al. (1998) 5 Energy Metrics:</strong><br>
            1. <em>Min Energy per Packet:</em> ∑(E_tx + E_rx). Fig 3: Path A-D-G (cost 5) vs B-G (cost 6).<br>
            2. <em>Max Time to Partition:</em> Identifies cut nodes via <strong>Max-Flow Min-Cut Theorem</strong> (Node D protects F, I, J).<br>
            3. <em>Min Variance in Power:</em> Balances energy dissipation equally across all nodes.<br>
            4. <em>Max (Avg) Capacity:</em> Favors highest total battery (Path C-E-G cap 8); avg prevents long paths.<br>
            5. <em>Max Min Capacity:</em> max(min(E_residual)) protects weakest node (Path B-G min cap 2).
          </div>
          <div>• <strong>QoS Metrics:</strong> ETT = ETX * (S / B) | ETX = 1 / (d_f * d_r) (Draves 2004, De Couto 2003).</div>
        </div>

        <div class="border border-slate-700 p-3 rounded-xl space-y-1.5 bg-slate-900/60">
          <h3 class="font-bold text-amber-400 uppercase text-xs">⚡ 2. Flooding & Data-Centric Routing (pp. 29–65)</h3>
          <div>• <strong>Flooding Deficiencies (Heinzelman 1999):</strong> Implosion (duplicate packets), Overlap (sensors in region Y send duplicate data), Resource Blindness (ignores battery). Control: TTL & SeqNum.</div>
          <div>• <strong>Gossiping (Hedetniemi 1988):</strong> Forwards with prob p, discards with 1-p. Solves implosion partially; fails overlap/resource blindness.</div>
          <div>• <strong>SPIN Family (Kulik 2002):</strong> Metadata negotiation (x < X), Resource Manager. Handshake: ADV → REQ → DATA.<br>
            - <em>SPIN-PP:</em> Point-to-point 3-way handshake; 1-hop awareness.<br>
            - <em>SPIN-EC:</em> Participates only if battery > safety threshold.<br>
            - <em>SPIN-BC:</em> Broadcast channel. Random backoff timer; overhearing identical REQ suppresses own REQ! DATA sent once.<br>
            - <em>SPIN-RL:</em> Reliable version; re-requests on timeout; rate-limits DATA.
          </div>
          <div>• <strong>Directed Diffusion (Intanagonwiwat 2000):</strong> Attribute-value naming. 3 Phases: Interest propagation (gradients setup) → Exploratory data delivery (low rate) → Path reinforcement (sink reinforces best neighbor with high rate). Push (SPIN) vs Pull (DD).</div>
          <div>• <strong>Rumor Routing (Braginsky 2002):</strong> Long-lived Agent with TTL walks network updating Event Tables (<Event, Dist, NextHop>). Query wanders randomly until hitting event path.</div>
          <div>• <strong>GBR (Schurgers 2001):</strong> Height = min hops to BS. Gradient = Height_node - Height_neighbor. Forwards on largest gradient. Balancing: Stochastic, Energy-Based, Stream-Based.</div>
        </div>

        <div class="border border-slate-700 p-3 rounded-xl space-y-1.5 bg-slate-900/60">
          <h3 class="font-bold text-amber-400 uppercase text-xs">⚡ 3. Proactive & Reactive Routing (pp. 66–87)</h3>
          <div>• <strong>DSDV (Perkins 1994):</strong> Distributed Bellman-Ford. Next hop k = min_j {d_ij^x}. Loop-free via Destination Sequence Numbers. Updates: Full Dump (entire table) vs Incremental Packet (changed routes). Replacement: higher seq num, or equal seq num with smaller hops. Moving node: Node C moves to H/G, D updates next hop E, distance 3.</div>
          <div>• <strong>OLSR (Clausen 2001):</strong> Link-state. Periodic HELLO senses 1-hop & 2-hop symmetric neighbors. Multipoint Relays (MPRs): minimal subset covering all 2-hop neighbors. ONLY MPRs forward topology control (TC) packets, cutting broadcast storms.</div>
          <div>• <strong>AODV (Perkins 1999):</strong> Reactive distance-vector. Source broadcasts RREQ (<Source, BroadcastID, Dest, DestSeqNum, HopCount>). Intermediate nodes record reverse pointers; reply with unicast RREP only if route SeqNum >= DestSeqNum in RREQ. Forward pointers set by RREP. Link breaks trigger RERR.</div>
          <div>• <strong>DSR (Johnson 1994):</strong> Source routing. Complete path stored in packet header; relays need no routing tables. Route Cache stores learned paths. RREQ accumulates intermediate hops; destination replies with full path. Supports asymmetric links and promiscuous route caching.</div>
        </div>

        <div class="border border-slate-700 p-3 rounded-xl space-y-1.5 bg-slate-900/60">
          <h3 class="font-bold text-amber-400 uppercase text-xs">⚡ 4. Hierarchical Routing Protocols (pp. 88–103)</h3>
          <div>• <strong>Clustering Principle:</strong> Solves scalability/collisions. Member nodes transmit to Cluster Head (CH). CH fuses data and relays to sink (single-hop vs multi-hop CH-to-sink).</div>
          <div>• <strong>Landmark Routing (Tsuchiya 1988):</strong> Landmark of radius n known to all nodes within n hops. Global landmark radius > network diameter. Hierarchical address LM2.LM1.LM0 routes from coarse to fine resolution.</div>
          <div>• <strong>LANMAR (Gerla 2000):</strong> Landmark + Fisheye State Routing (FSR). Landmark is CH of logical subnet. Detailed updates confined to local fisheye scope; distant packets routed to subnet landmark.</div>
          <div>• <strong>LEACH (Heinzelman 2000):</strong> Distributed clustering with randomized CH rotation. TDMA intra-cluster, CDMA inter-cluster. Assumes all CHs reach base station directly.</div>
          <div>• <strong>PEGASIS (Lindsey 2002):</strong> Linear greedy chain. Nodes transmit only to closest chain neighbor; data fuses along chain; 1 rotating leader per round transmits to base station. 100-300% energy gain over LEACH; high latency.</div>
          <div>• <strong>Safari Architecture (Du 2008):</strong> Self-organizing hierarchy of Drums (landmarks) and Cells (Level 0 node, Level 1 fundamental cells, supercells). Periodic drum beacons guide hierarchy. Hybrid routing: reactive DSR within cells, proactive reverse-beacon routing between cells. Extreme scalability.</div>
        </div>
      </div>
    `;
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
    title: "Unit 4 • Lecture 1: Network Layer Overview & Routing Metrics (pp. 1–28)",
    sections: [
      {
        heading: "1. Role of Network Layer & Multi-Hop Relay Model (Slides 1–7)",
        items: [
          "<strong>Single-Hop vs Multi-Hop Communication:</strong> Direct (single-hop) transmission is only feasible in small networks where sensor nodes and the gateway/sink are in close proximity. Real-world WSN applications deploy large numbers of nodes covering extensive geographic terrains, necessitating indirect (multi-hop) communication where intermediate nodes act as forwarding relays.",
          "<strong>Dual Functionality of Sensor Nodes:</strong> Sensor nodes must not only generate and disseminate their own sensed information, but also serve as intermediate relays forwarding packets originating from other sensors toward the gateway.",
          "<strong>Routing Definition:</strong> The fundamental network-layer process of discovering, establishing, and maintaining paths from a source sensor node to a destination sink across one or more intermediate relay nodes.",
          "<strong>Deterministic Deployment:</strong> Nodes are placed at predetermined, known physical coordinates (e.g., factory automation, structural health monitoring). Allows pre-calculated, static routing tables with minimal dynamic control overhead.",
          "<strong>Randomized Deployment:</strong> Nodes are scattered randomly (e.g., aerial airdrop in disaster zones or battlefields), yielding non-uniform, unpredictable topologies. Sensor nodes must autonomously self-organize: discover their relative locations, identify neighbors, and dynamically establish routing paths.",
          "<strong>Severe Hardware & Operational Constraints:</strong> WSN routing protocols must operate under stringent constraints: ultra-low CPU processing power, minimal RAM/storage, low radio bandwidth, limited onboard battery capacity, and high susceptibility to node failures (battery depletion, environmental damage). Global addressing schemes (like IP/CIDR) are non-feasible due to high header overhead and node mobility."
        ]
      },
      {
        heading: "2. Al-Karaki & Kamal (2004) 3-Way Routing Classification (Slides 8–15)",
        items: [
          "<strong>Dimension 1 — Network Structure / Organization:</strong><br>• <em>Flat-based Routing:</em> All sensor nodes play identical, uniform roles and collaborate equally to forward data (e.g., SPIN, Directed Diffusion). Simple, but faces scalability bottlenecks in dense networks.<br>• <em>Hierarchical-based Routing:</em> Nodes perform differentiated roles. The network is partitioned into clusters; member nodes transmit only to their designated Cluster Head (CH). CHs perform data aggregation and relay consolidated packets to the sink.<br>• <em>Location-based Routing:</em> Routing decisions are made using spatial/geographic coordinates (via GPS or localized triangulation) rather than network addresses (e.g., GPSR, GEAR, GAF).",
          "<strong>Dimension 2 — Route Discovery Process:</strong><br>• <em>Reactive (On-Demand) Routing:</em> Routes are discovered strictly when a source has data to send and lacks a route. Saves table storage and control overhead, but introduces initial route discovery latency.<br>• <em>Proactive (Table-Driven) Routing:</em> Nodes continuously calculate and maintain routes to all destinations in advance. Zero discovery latency upon packet generation, but incurs high control message overhead and risks maintaining stale routes.<br>• <em>Hybrid Routing:</em> Combines proactive mechanisms within local neighborhoods and reactive discovery for distant nodes (e.g., Safari, ZRP).",
          "<strong>Dimension 3 — Protocol Operation Paradigms:</strong><br>• <em>Negotiation-based:</em> Nodes exchange compact metadata descriptors before transmitting raw data payloads to avoid transmitting redundant information (e.g., SPIN).<br>• <em>Multipath-based:</em> Establishes multiple concurrent paths between source and destination to provide fault tolerance, load balancing, and increased aggregate throughput.<br>• <em>Query-based:</em> Receiver-initiated dissemination. The sink broadcasts queries/interests, and only sensors matching the query respond with data (e.g., Directed Diffusion).<br>• <em>QoS-based:</em> Protocol explicitly balances performance metrics (bounded latency, minimum throughput, low packet loss, energy consumption) to meet application QoS constraints.<br>• <em>Coherent vs Non-Coherent In-Network Processing:</em> Coherent protocols perform minimal local processing (e.g., simple filtering/relaying) before passing raw data to centralized aggregators; Non-coherent protocols perform heavy local preprocessing (e.g., feature extraction, local state estimation) before transmitting condensed summaries.",
          "<strong>Dissemination Models:</strong> Unicast (exactly one receiver), Multicast (a defined group of nodes), Broadcast (all nodes in the network), and Data-Centric (addressed by data attributes rather than node IDs)."
        ]
      },
      {
        heading: "3. Application Data Reporting Models (Slides 16–17)",
        items: [
          "<strong>Time-Driven Reporting:</strong> Sensor nodes periodically sample and transmit environmental data at regular, fixed time intervals (e.g., ambient temperature or soil moisture monitoring). Predictable, continuous traffic patterns well-suited for proactive routing.",
          "<strong>Event-Driven Reporting:</strong> Sensor nodes remain in low-power idle/sleep modes and transmit data only when a specific physical threshold or event of interest occurs (e.g., forest fire detection, intrusion alarms, structural cracks). Highly bursty traffic with strict latency bounds, well-suited for reactive and data-centric routing."
        ]
      },
      {
        heading: "4. Commonly Used Routing Metrics & Link Quality (Slides 18, 26–28)",
        items: [
          "<strong>Minimum Hop (Shortest Hop) Metric (Slide 18):</strong> Finds the path from source to destination requiring the smallest total count of relay nodes. Rationale: Minimizes end-to-end delay and reduces overall network resource consumption because the smallest possible number of forwarding nodes participate. Weakness: Tends to overload bottleneck nodes and ignores residual energy.",
          "<strong>Quality-of-Service (QoS) Metrics (Slide 26):</strong><br>• <em>Latency:</em> End-to-end communication delay from source generation to sink reception (crucial for real-time target tracking).<br>• <em>Throughput:</em> Actual volume of valid sensor data successfully delivered per unit time.<br>• <em>Jitter:</em> Statistical variance in end-to-end latency across consecutive packets.<br>• <em>Packet Loss:</em> Proportion of dropped packets due to radio channel noise, collision, or buffer overflow.",
          "<strong>Expected Transmission Time (ETT) (Draves et al. 2004, Slide 27):</strong> Represents the expected time required to successfully transmit a packet over a wireless link at the MAC layer: <code>ETT = ETX * (S / B)</code>, where <em>S</em> is average packet size (bytes) and <em>B</em> is raw link bandwidth (bytes/sec).",
          "<strong>Expected Transmission Count (ETX) (De Couto et al. 2003, Slide 27):</strong> Measures the expected number of MAC-layer transmissions (including retransmissions) needed to successfully deliver a packet over a link: <code>ETX = 1 / (d_f * d_r)</code>, where <em>d_f</em> is the forward packet reception rate and <em>d_r</em> is the reverse acknowledgment reception rate.",
          "<strong>Robustness Metric (Slide 28):</strong> Protocols actively estimate link quality (signal-to-noise ratio, PRR) to each neighbor and select paths with the highest cumulative or average link quality, avoiding lossy, unstable links."
        ],
        formula: "ETT = ETX * (S / B)  |  ETX = 1 / (d_f * d_r)"
      },
      {
        heading: "5. Energy Routing Metrics & Graph Analysis (Singh et al. 1998, Slides 19–25)",
        items: [
          "<strong>Significance of Energy Efficiency:</strong> Energy is the most critical constraint in WSNs. There is no single universal energy metric; Singh et al. (1998) formulated five distinct interpretations:",
          "<strong>a) Minimum Energy Consumed per Packet (Slide 21):</strong> Minimizes the sum of energy consumed for transmission (E_tx) and reception (E_rx) along the entire route. In Figure 3: Path A–D–G has a total link cost of 5 (costs: A→D=2, D→G=3), whereas the minimum-hop path B–G has a total link cost of 6. Thus, path A–D–G is chosen despite having more hops!",
          "<strong>b) Maximum Time to Network Partition (Slides 22–23):</strong> Prevents the failure of critical 'bridge' or 'cut' nodes whose depletion splits the network into disconnected subnetworks. Minimal disconnecting sets of nodes are identified mathematically using the <em>Max-Flow Min-Cut Theorem</em>. In Figure 3: Node D is a critical bridge node; if node D's battery becomes depleted, nodes F, I, and J become completely disconnected and unreachable from the rest of the network! The routing protocol balances traffic to deflect packets away from D.",
          "<strong>c) Minimum Variance in Node Power Levels (Slide 24):</strong> Distributes traffic so that energy consumption is equalized across all nodes in the network, preventing localized hot spots and maximizing the functional lifetime of the entire network.",
          "<strong>d) Maximum (Average) Energy Capacity (Slides 24–25):</strong> Focuses on current remaining battery reserves rather than link propagation costs. Favors routes with the highest total remaining energy capacity. In Figure 3: Path C–E–G is selected because its total residual capacity is 8 (Node C=3, E=3, G=2). <em>Limitation:</em> It can favor unnecessarily long routes just to accumulate capacity. The variant <strong>Maximum Average Energy Capacity</strong> fixes this by dividing total capacity by hop count.",
          "<strong>e) Maximum Minimum Energy Capacity (Slide 25):</strong> Maximizes the minimum residual energy capacity along the route: <code>max(min(E_residual))</code>. Focuses on protecting the weakest node from premature exhaustion. In Figure 3: Path B–G is selected because its bottleneck minimum capacity is 2 (Node B=2, G=2), which is higher than the bottleneck of alternative paths."
        ],
        formula: "max(min(E_residual))  |  Max-Flow Min-Cut Theorem  |  Cost(A-D-G) = 5 vs Cost(B-G) = 6"
      }
    ]
  },
  lec2: {
    title: "Unit 4 • Lecture 2: Flooding, Gossiping & Data-Centric Routing (pp. 29–65)",
    sections: [
      {
        heading: "1. Flooding & Gossiping Mechanisms & Deficiencies (Slides 31–38)",
        items: [
          "<strong>Classic Flooding Mechanism (Slide 31):</strong> A sender node broadcasts a packet to all immediate neighbors. Each receiving neighbor rebroadcasts to all its neighbors, continuing recursively until all network nodes receive the packet or a maximum hop limit (TTL) is exhausted. Advantage: Maximum simplicity and guaranteed delivery in lossless, connected graphs. Disadvantage: Generates enormous broadcast traffic and packet collisions.",
          "<strong>Flooding Controls (Slide 32):</strong> Maximum-hop counts (TTL) prevent packets from looping indefinitely; Sequence Numbers in packet headers identify unique packets, allowing nodes to discard duplicates.",
          "<strong>Three Critical Deficiencies of Flooding (Heinzelman et al. 1999, Slides 33–36):</strong><br>• <strong>1. Implosion (Slide 34, Fig 1 Left):</strong> A node receives duplicate copies of the exact same packet from multiple neighbors. Example: Node A broadcasts packet P1 to neighbors B and C. Both B and C rebroadcast P1 to node D. Node D receives duplicate P1, wasting radio transceiver energy.<br>• <strong>2. Overlap (Slide 35, Fig 1 Right):</strong> Colocated sensors monitor overlapping geographic sensing regions (Region Y). Sensors A and B both record identical physical phenomena in Region Y and both independently forward their readings to common neighbor C, wasting channel bandwidth and energy. Overlap is harder to solve because it requires mapping physical sensor readings to spatial topology.<br>• <strong>3. Resource Blindness (Slide 36):</strong> Flooding is completely incognizant of node battery constraints; it blindly routes packets through energy-depleted nodes, rapidly causing premature node death and network partition.",
          "<strong>Gossiping Protocol (Hedetniemi et al. 1988, Slides 37–38):</strong> A randomized, probabilistic routing technique. Instead of broadcasting to all neighbors, a node forwards the packet to a randomly selected neighbor with probability <em>p</em>, and discards the packet with probability <em>1 - p</em>. Alleviates the implosion problem partially by reducing message volume. <em>Limitations:</em> Does NOT solve overlap or resource blindness; if <em>p</em> is too low, packet delivery fails; if <em>p = 1</em>, it degenerates into classic flooding."
        ]
      },
      {
        heading: "2. Data-Centric Routing Concept & Philosophy (Slide 39)",
        items: [
          "<strong>Paradigm Shift:</strong> Address-centric routing routes data between specific node IP addresses. In contrast, <em>Data-Centric Routing</em> focuses on the data itself: data retrieval and dissemination described by content attributes or query criteria, rather than node identities.",
          "<strong>Collaborative Flat Networks:</strong> Perfectly aligned with flat-based WSNs where all nodes play identical roles and collaborate to perform sensing, routing, and in-network processing without global addressing."
        ]
      },
      {
        heading: "3. SPIN Protocol Family (Sensor Protocols for Information via Negotiation) (Slides 40–50)",
        items: [
          "<strong>Origin & Category (Kulik et al. 2002, Slide 40):</strong> Negotiation-based, data-centric, time-driven routing protocol family. Solves flooding deficiencies using two core techniques:<br>1. <em>Meta-Data Negotiation:</em> Nodes exchange concise meta-data descriptors before transmitting raw data payloads, eliminating implosion and overlap.<br>2. <em>Resource Manager:</em> Each node has an internal resource manager tracking battery levels, eliminating resource blindness by adapting routing participation.",
          "<strong>Meta-Data Axiom (Slide 41):</strong> If <em>x</em> is the meta-data size and <em>X</em> is the raw sensor data size, the size of <em>x</em> must be strictly smaller than <em>X</em> (<code>x < X</code>). Identical sensor data must yield identical meta-data. Meta-data is application-specific (e.g., camera sensor uses tuple <code>(x, y, φ)</code> where x,y are coordinates and φ is camera orientation).",
          "<strong>SPIN-PP (Point-to-Point, Slides 42–45, Fig 2):</strong> Designed for lossless point-to-point links. Operates via a 3-way handshake:<br>• Step 1 — <code>ADV</code> (Advertisement): Source broadcasts meta-data describing newly collected sensor data.<br>• Step 2 — <code>REQ</code> (Request): Neighbor checks its local memory. If it does not possess the data, it replies with REQ. If it already has the data, it ignores the ADV.<br>• Step 3 — <code>DATA</code>: Source transmits the full payload only to requesting neighbors.<br>• Nodes only need 1-hop neighbor knowledge. Neighbors can aggregate received data and advertise new aggregates.<br>• Loss handling: Compensates for lost ADV by periodic readvertisements; compensates for lost REQ/DATA via timeouts or explicit request lists.",
          "<strong>SPIN-EC (Energy-Constrained, Slide 46):</strong> Adds an energy heuristic to SPIN-PP. Nodes participate in the 3-way handshake only if their current energy reserve is above a low-energy safety threshold and they have sufficient battery to complete all stages (REQ transmission + DATA reception) without falling below the threshold.",
          "<strong>SPIN-BC (Broadcast Channel, Slides 47–49):</strong> Designed for wireless broadcast media (one-to-many communication). When an ADV is broadcast, multiple neighbors may need the data. To prevent collision:<br>• A node wishing to receive data sets a <em>random backoff timer</em> chosen uniformly from a predetermined interval.<br>• When the timer expires, it broadcasts REQ (naming the advertiser in the header).<br>• <strong>REQ Suppression:</strong> If a node overhears an identical REQ from another neighbor while its timer is running, it cancels its timer and suppresses its own REQ!<br>• The advertiser broadcasts <code>DATA</code> to the broadcast address <strong>only once</strong>, satisfying all listening neighbors and ignoring duplicate requests!",
          "<strong>SPIN-RL (Reliable Version, Slides 49–50):</strong> Reliable extension of SPIN-BC for lossy channels and asymmetric links. Keeps track of overheard REQ messages; if corresponding DATA does not arrive within a timeout, re-requests data by broadcasting REQ directed to a randomly selected node among those that previously advertised the data. Enforces rate-limiting: once a node sends a DATA message, it waits a predetermined time before responding to any other requests for the same data."
        ],
        formula: "x < X (Meta-data size < Raw data size)  |  3-Way Handshake: ADV → REQ → DATA"
      },
      {
        heading: "4. Directed Diffusion (Intanagonwiwat, Govindan, Estrin 2000, Slides 51–56)",
        items: [
          "<strong>Application-Aware Attribute-Value Naming (Slides 51–53):</strong> Data and sensing tasks are named using attribute-value pairs without globally valid node IDs. Example task specification:<br><code>type = vehicle // detect vehicle location</code><br><code>interval = 20 ms // send data every 20 ms</code><br><code>duration = 10 s // perform task for 10 s</code><br><code>rect = [-100,-100,200,200] // from sensors within rectangle</code>",
          "<strong>Three-Phase Protocol Operation (Slide 54, Fig 2):</strong><br>• <strong>Phase 1: Interest Propagation:</strong> Sink periodically broadcasts an Interest message describing the task. Intermediate nodes diffuse (rebroadcast) the interest and set up <strong>Gradients</strong> (reply links/pointers directed toward the neighbor from which interest was received).<br>• <strong>Phase 2: Initial Exploratory Data Delivery:</strong> Matching sensor sources produce sensor readings and dispatch exploratory data along all gradients at a low data rate.<br>• <strong>Phase 3: Path Reinforcement:</strong> Upon receiving exploratory data, the sink reinforces one preferred neighbor (e.g., shortest latency, best link quality) by sending an updated interest with a higher data rate (interval = 20ms). This neighbor reinforces its best upstream neighbor until the high-rate path reaches the source. Non-optimal paths are negatively reinforced.",
          "<strong>Critical Differences from SPIN (Slide 56):</strong> In Directed Diffusion, queries (interests) are issued on-demand by sinks (query pull). In SPIN, data is advertised by sources (data push). All communication is neighbor-to-neighbor, enabling in-network aggregation and caching without global IP. Limitation: Query-driven nature is less suited for continuous periodic streaming."
        ]
      },
      {
        heading: "5. Rumor Routing & Gradient-Based Routing (GBR) (Slides 57–65)",
        items: [
          "<strong>Rumor Routing (Braginsky & Estrin 2002, Slides 57–62):</strong> Strikes an optimal compromise between Event Flooding (wasteful when events are common) and Query Flooding (wasteful when queries are common). Ideal for moderate query-to-event ratios.<br>• <em>Event Tables & Agents:</em> Each node maintains a Neighbor List and an <strong>Event Table</strong> (columns: Event, Distance, Next Hop). When a node detects an event, it records it with distance 0 and generates a long-lived <strong>Agent</strong> packet with a TTL with a certain probability.<br>• <em>Agent Random Walk:</em> The Agent travels through the network, learning routes and updating other nodes' event tables with shorter paths to observed events (Slide 59, Fig 3: Agent from node E reaches node A via G; A updates table for Event E1 with next hop G and shorter distance).<br>• <em>Query Delivery:</em> Sink query follows event table pointers if known; otherwise wanders randomly (recording visited nodes to avoid loops) until intersecting an event path. If timeout expires, falls back to flooding.<br>• Rumor routing accepts non-optimal paths to achieve massive energy savings; latency is not guaranteed.",
          "<strong>Gradient-Based Routing (GBR) (Schurgers & Srivastava 2001, Slides 63–65):</strong> Variant of Directed Diffusion. Computes the <strong>Height</strong> of each node = minimum hop count to the Base Station. Computes <strong>Gradient</strong> = <code>Height_node - Height_neighbor</code>.<br>• <em>Forwarding Rule:</em> Nodes forward packets along the link with the <strong>largest positive gradient</strong>.<br>• <em>Data Aggregation:</em> When multiple routes pass through a node, their data is fused.<br>• <strong>Three Traffic Balancing Schemes (Slide 65):</strong><br>1. <em>Stochastic Scheme:</em> When multiple links have equal maximum gradient, a node selects one at random to balance traffic.<br>2. <em>Energy-Based Scheme:</em> When a node's battery drops below a threshold, it artificially inflates its height, reducing its gradient and deflecting traffic away to conserve battery.<br>3. <em>Stream-Based Scheme:</em> A node carrying an active data stream increases its height to prevent other streams from routing through it."
        ],
        formula: "Gradient = Height_node - Height_neighbor  |  Event Table: <Event, Distance, NextHop>"
      }
    ]
  },
  lec3_1: {
    title: "Unit 4 • Lecture 3.1: Proactive, Reactive & Hierarchical Routing (pp. 66–103)",
    sections: [
      {
        heading: "1. Proactive (Table-Driven) Routing: DSDV & OLSR (Slides 66–74)",
        items: [
          "<strong>Proactive Routing Philosophy (Slide 66):</strong> Routes are established and continuously maintained to all destinations in advance. Advantage: Zero route discovery latency upon packet generation. Disadvantages: Heavy control message overhead; high memory consumption for tables; risk of stale routes causing delivery errors.",
          "<strong>DSDV (Destination-Sequenced Distance Vector) (Perkins & Bhagwat 1994, Slides 66–70):</strong> Modified Distributed Bellman-Ford algorithm.<br>• Node <em>i</em> maintains distances {d_ij^x} for each destination <em>x</em> via neighbor <em>j</em>. Next hop <em>k</em> is chosen where d_ik^x = min_j {d_ij^x}.<br>• Table entries: Destination, Next Hop, Distance, and <strong>Destination Sequence Number</strong> (assigned exclusively by the destination node to eliminate routing loops).<br>• <em>Packet Types:</em> <strong>Full Dump</strong> (entire routing table, transmitted infrequently) vs <strong>Incremental Packet</strong> (changed routes only, transmitted frequently; much smaller, reducing control overhead).<br>• <em>Route Replacement Rules:</em> (1) Higher sequence number always replaces older sequence number; (2) If sequence numbers are identical, the route with smaller distance (fewer hops) replaces the existing route.<br>• <em>Moving Node Scenario (Slide 69–70, Fig 3):</em> Node C moves from near B to near nodes H and G. Updates from D's neighbors inform D that the route to C via B is invalid, and a new route via node E exists. Node D updates its routing table: Destination C, Next Hop E, Distance 3.",
          "<strong>OLSR (Optimized Link State Routing) (Clausen et al. 2001, Slides 71–74):</strong> Standardized proactive link-state protocol.<br>• <em>Neighbor Sensing:</em> Periodic <code>HELLO</code> broadcasts discover 1-hop and 2-hop symmetric (bidirectional) and asymmetric neighbors.<br>• <strong>Multipoint Relays (MPRs):</strong> Each node selects an <em>MPR Selector Set</em>: a minimal subset of 1-hop symmetric neighbors that collectively covers all of its 2-hop neighbors.<br>• <em>Core Innovation:</em> <strong>ONLY nodes selected as MPRs are allowed to forward topology control (TC) messages!</strong> (Slide 72, Fig 4). Non-MPR nodes process TC packets but never retransmit them, eliminating broadcast storms.<br>• Nodes announce reachability to their MPRs, creating an optimized partial topology map sufficient for shortest-path Dijkstra calculations."
        ]
      },
      {
        heading: "2. Reactive (On-Demand) Routing: AODV & DSR (Slides 75–87)",
        items: [
          "<strong>Reactive Routing Philosophy (Slide 77):</strong> Routes are discovered on-demand, strictly when a source needs to send data and has no active route established.",
          "<strong>AODV (Ad Hoc On-Demand Distance Vector) (Perkins & Royer 1999, Slides 77–84):</strong><br>• <em>Route Discovery:</em> Source broadcasts a Route Request (<code>RREQ</code>) packet: <code><Source_Addr, Broadcast_ID, Dest_Addr, Dest_Seq_Num, Hop_Count></code>. Broadcast ID increments with each new RREQ; the pair <code><Source_Addr, Broadcast_ID></code> uniquely identifies RREQ to discard duplicates.<br>• <em>Reverse Path Setup:</em> Rebroadcasting nodes record the address of the neighbor from which RREQ came, creating a reverse path to the source.<br>• <em>Reply Rule:</em> An intermediate node replies with a unicast Route Reply (<code>RREP</code>) only if its route sequence number is <strong>greater than or equal to</strong> the Dest_Seq_Num in RREQ. Otherwise, it increments hop count and rebroadcasts RREQ.<br>• <em>Forward Path Setup:</em> As unicast RREP returns along the reverse path, nodes set up forward pointers and record the latest destination sequence number.<br>• <em>RREP Filter (Slide 83):</em> An intermediate node forwards RREP upstream only if: (1) first copy received, (2) higher destination sequence number, or (3) identical sequence number with smaller hop count.<br>• <em>Route Maintenance:</em> Periodic HELLO beacons or MAC feedback detect broken links. The node detecting the break issues a Route Error (<code>RERR</code>) upstream to notify the source to reinitiate discovery. Route table entries expire via timers.",
          "<strong>DSR (Dynamic Source Routing) (David B. Johnson 1994, Slides 84–87):</strong><br>• <em>Source Routing Principle:</em> The originating sender places the complete sequence of intermediate node addresses directly into the packet header! Relay nodes do not need routing tables; they simply forward to the next hop in the header.<br>• <em>Route Cache:</em> Nodes maintain route caches continuously updated by learning routes from forwarded packets.<br>• <em>Route Discovery:</em> Source checks cache; if no route, broadcasts RREQ (<code><Source, Dest, Request_ID></code>). Intermediate nodes append their address to the header. If a node detects its own address in header, it discards packet (loop prevention). Duplicate RREQs dropped via cache.<br>• <em>Route Reply:</em> Destination receives RREQ containing the complete path. In symmetric networks, destination unicasts RREP along reverse path. In asymmetric networks, destination initiates its own RREQ to source, piggybacking the discovered route.<br>• <em>DSR vs AODV:</em> DSR enables promiscuous route caching (intermediate nodes learn routes by snooping on headers) and naturally supports asymmetric links, but incurs header overhead that grows with hop count."
        ]
      },
      {
        heading: "3. Hierarchical Routing & Clustering Architectures (Slides 88–103)",
        items: [
          "<strong>Hierarchical Clustering Concept (Slides 88–90):</strong> Groups sensor nodes into clusters to address scalability and efficiency weaknesses of flat routing. Ordinary member nodes transmit only to their designated <strong>Cluster Head (CH)</strong>. CHs aggregate/compress data and forward to the sink.<br>• <em>CH-to-Sink Topologies (Slide 90, Fig 1):</em> Single-hop CH-to-sink (CHs transmit directly to sink) vs Multi-hop CH-to-sink (CHs relay data across intermediate CHs toward sink).<br>• <em>Benefits & Challenges:</em> Drastically reduces radio medium collisions and sensor transmission energy; facilitates data fusion. Challenges include CH election, dynamic cluster formation, and CH energy exhaustion.",
          "<strong>Landmark Routing (Paul F. Tsuchiya 1988, Slides 91–96):</strong><br>• <em>Definition:</em> A node <em>i</em> for which all nodes within <em>n</em> hops maintain routing information toward <em>i</em> is called a <strong>Landmark of Radius n</strong> (Slide 91/95: Nodes 2–6 know route to node 1; nodes 7–11 do not → node 1 is a landmark of radius 2).<br>• <em>Global Landmarks:</em> Landmarks whose radius exceeds the network diameter (known to all nodes in the network).<br>• <em>Hierarchical Address:</em> Address consists of a sequence of landmark IDs from coarse to fine resolution (e.g., <code>LM2.LM1.LM0</code>).<br>• <em>Routing Walk:</em> Source inspects table, finds LM2, forwards toward LM2. Upon entering LM1 radius, relay node finds both LM2 and LM1; selects LM1 (finer resolution). Inside LM0 radius, delivers directly to LM0.",
          "<strong>LANMAR (Landmark Ad Hoc Routing) (Gerla et al. 2000, Slides 97–98):</strong> Combines Landmark Routing with Fisheye State Routing (FSR). Each landmark serves as cluster head of a logical subnet. FSR principle: update frequency depends on distance (high within local fisheye scope, zero outside). Packet forwarded directly if destination is within fisheye scope; otherwise routed toward subnet landmark until entering target fisheye scope.",
          "<strong>LEACH (Heinzelman et al. 2000, Slides 98–99):</strong> Clustered protocol with randomized CH rotation. Assumes CHs can reach base station directly. Intra-cluster uses TDMA schedules (members sleep during non-assigned slots); Inter-cluster uses CDMA codes to avoid co-channel interference.",
          "<strong>PEGASIS (Lindsey & Raghavendra 2002, Slides 99–100):</strong> Chain-based routing protocol.<br>• Nodes self-organize into a linear chain using a greedy nearest-neighbor algorithm.<br>• Each node transmits only to its closest chain neighbor. Data aggregates along the chain at each hop.<br>• Only <strong>one leader node per round</strong> transmits to the base station. The leader role rotates among all chain nodes.<br>• Achieves up to 100–300% energy savings compared to LEACH, but incurs high latency for distant chain nodes.",
          "<strong>Safari Architecture (Du et al. 2008, Slides 100–102):</strong> Self-organizing multi-scale hierarchy.<br>• Employs landmarks called <strong>Drums</strong> forming <strong>Cells</strong> (Level 0 = individual node; Level 1 = fundamental cells; Higher levels = supercells).<br>• Drums periodically broadcast scoped beacons providing positional awareness and routing information.<br>• <em>Hybrid Routing:</em> Uses reactive <strong>DSR</strong> within fundamental cells, and proactive routing between cells following the <strong>reverse path of drum beacons</strong> based on hierarchical addresses. Extremely scalable."
        ],
        formula: "Landmark Address: LM2.LM1.LM0  |  PEGASIS Linear Chain  |  Safari Drums & Cells"
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
  { cat: "Energy Metrics", q: "Singh et al. (1998) 5 Energy Routing Metrics", a: `1. Minimum energy consumed per packet
2. Maximum time to network partition (Max-Flow Min-Cut)
3. Minimum variance in node power levels
4. Maximum (average) energy capacity
5. Maximum minimum energy capacity: max(min(E_residual))` },
  { cat: "Energy Metrics", q: "How is Maximum Time to Network Partition determined?", a: "By identifying critical bridge/cut nodes whose depletion disconnects subgraphs, calculated using the Max-Flow Min-Cut Theorem (e.g. Node D protects nodes F, I, J)." },
  { cat: "Formulas", q: "Expected Transmission Time (ETT) Formula", a: "ETT = ETX * (S / B), where S is average packet size and B is link bandwidth (Draves et al. 2004)." },
  { cat: "Formulas", q: "Expected Transmission Count (ETX) Formula", a: "ETX = 1 / (d_f * d_r), where d_f is forward reception rate and d_r is reverse acknowledgment rate (De Couto et al. 2003)." },
  { cat: "Formulas", q: "GBR Gradient Formula", a: "Gradient = Height_node - Height_neighbor, where Height is the minimum hop count to the Base Station." },
  { cat: "Flooding & Gossiping", q: "Three Deficiencies of Classic Flooding (Heinzelman 1999)", a: `1. Implosion (duplicate packets received from multiple neighbors)
2. Overlap (colocated sensors in region Y send identical data)
3. Resource Blindness (ignores battery levels)` },
  { cat: "Flooding & Gossiping", q: "Gossiping Probabilistic Forwarding (Hedetniemi 1988)", a: "Forwards packet to random neighbor with probability p, discards with 1 - p. Reduces implosion, but fails to solve overlap or resource blindness; low p risks delivery failure." },
  { cat: "SPIN Family", q: "Two Fundamental Pillars of SPIN (Kulik et al. 2002)", a: `1. Meta-data negotiation (size x < X, identical data = identical metadata) to eliminate implosion and overlap.
2. Internal Resource Manager to eliminate resource blindness.` },
  { cat: "SPIN Family", q: "SPIN-PP 3-Way Handshake", a: "ADV (advertises metadata) → REQ (requests data if not possessed) → DATA (transmits raw payload). Single-hop neighbor awareness only." },
  { cat: "SPIN Family", q: "SPIN-BC Request Suppression Mechanism", a: "Receiving node starts a random backoff timer. If an identical REQ is overheard before expiry, timer is cancelled and REQ is suppressed! Sender broadcasts DATA only once." },
  { cat: "SPIN Family", q: "SPIN-EC & SPIN-RL Distinct Features", a: `SPIN-EC: participates in handshake only if battery > safety threshold.
SPIN-RL: reliable broadcast for lossy links; re-requests data on timeout and rate-limits DATA transmissions.` },
  { cat: "Directed Diffusion", q: "Three Phases of Directed Diffusion (Intanagonwiwat 2000)", a: `1. Interest Propagation (sink broadcasts interest, sets up reverse gradients)
2. Exploratory Data Delivery (matching sources send low-rate data along all gradients)
3. Path Reinforcement (sink sends high-rate interest to reinforce best path).` },
  { cat: "Directed Diffusion", q: "SPIN vs Directed Diffusion Key Contrast", a: "SPIN is Source-Advertised (data push); Directed Diffusion is Sink-Queried (query pull). Directed diffusion natively enables in-network aggregation along gradients." },
  { cat: "Rumor Routing", q: "Rumor Routing Agent & Query Traversal (Braginsky 2002)", a: "Observed event generates a long-lived Agent packet with a TTL that walks the network updating Event Tables. Sinks send queries that wander until intersecting an event path." },
  { cat: "GBR", q: "Three Traffic Balancing Schemes in GBR", a: `1. Stochastic: random choice among equal maximum gradients.
2. Energy-Based: low battery nodes artificially inflate height to deflect traffic.
3. Stream-Based: nodes carrying active streams increase height.` },
  { cat: "Proactive Routing", q: "DSDV Loop Prevention & Packet Types (Perkins 1994)", a: "Uses Destination Sequence Numbers assigned by destination. Exchanges Full Dumps (entire table, infrequent) and Incremental Packets (changed routes only, low overhead)." },
  { cat: "Proactive Routing", q: "OLSR Multipoint Relays (MPRs) (Clausen 2001)", a: "Minimal subset of 1-hop symmetric neighbors covering all 2-hop neighbors. ONLY MPRs are permitted to forward topology control packets, eliminating broadcast storms." },
  { cat: "Reactive Routing", q: "AODV Route Discovery & Reply Rule (Perkins & Royer 1999)", a: "Source broadcasts RREQ. Intermediate node replies with unicast RREP only if its route sequence number is >= DestSeqNum in RREQ. RREP establishes forward pointers." },
  { cat: "Reactive Routing", q: "DSR Source Routing & Route Cache (Johnson 1994)", a: "Originating source includes the complete sequence of intermediate hops in the packet header. Intermediate nodes cache learned paths and need no routing tables." },
  { cat: "Hierarchical Routing", q: "Landmark Routing Address Structure (Tsuchiya 1988)", a: "Address consists of a sequence of landmark IDs: LM2.LM1.LM0. Routing walks from coarse global landmarks to fine localized landmarks." },
  { cat: "Hierarchical Routing", q: "LANMAR & Fisheye State Routing (Gerla 2000)", a: "Each landmark is cluster head of a logical subnet. Detailed routing updates restricted to local fisheye scope; distant packets routed toward subnet landmark." },
  { cat: "Hierarchical Routing", q: "PEGASIS Linear Greedy Chain Gathering (Lindsey 2002)", a: "Nodes form a linear chain; each communicates only with closest chain neighbor. Data aggregates along chain; exactly one rotating leader per round transmits to base station." },
  { cat: "Hierarchical Routing", q: "Safari Architecture Drums and Cells (Du 2008)", a: "Self-organizing hierarchy using Drums (landmarks) and Cells (Level 0 node, Level 1 fundamental cells, supercells). Hybrid: reactive DSR within cells, proactive reverse-beacon between cells." }
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
  { q: "Define Routing in Wireless Sensor Networks.", a: "Routing is the network-layer process of discovering, establishing, and maintaining paths from a source sensor node to a destination sink (gateway) across one or more intermediate forwarding relay nodes." },
  { q: "Distinguish between Deterministic and Randomized deployment in WSNs.", a: "Deterministic deployment places nodes at predetermined coordinates, enabling static routing tables. Randomized deployment scatters nodes unpredictably (e.g. airdrop), requiring autonomous self-organization for neighbor discovery and path establishment." },
  { q: "What is Implosion in classic flooding?", a: "Implosion occurs when a node receives duplicate copies of the exact same packet from multiple neighboring nodes (e.g. A sends to B and C, both forward to D), wasting bandwidth and transceiver energy." },
  { q: "What is the Overlap problem in sensor networks?", a: "Overlap occurs when colocated sensors monitor overlapping physical areas (region Y) and both forward identical sensor readings to the same neighboring receiver, causing redundant transmissions." },
  { q: "How does SPIN overcome resource blindness?", a: "Each SPIN node incorporates an internal Resource Manager that continuously monitors remaining battery levels and curtails participation in routing handshakes when energy approaches a low-energy safety threshold." },
  { q: "State the mandatory requirement for meta-data in SPIN.", a: "If x describes the meta-data for raw sensor data X, the size of x in bytes must be strictly less than the size of X (x < X), and two identical pieces of sensor data must produce identical meta-data." },
  { q: "How does SPIN-BC eliminate redundant requests in a broadcast channel?", a: "When receiving an ADV, a node sets a random backoff timer. If it overhears an identical REQ from another neighbor before its timer expires, it cancels its timer and suppresses its own REQ. The sender broadcasts DATA only once." },
  { q: "State the three phases of Directed Diffusion.", a: "1. Interest Propagation (sink broadcasts interests, setting up reverse gradients); 2. Initial Exploratory Data Delivery (low-rate data along all gradients); 3. Path Reinforcement (sink reinforces best neighbor with high data rate)." },
  { q: "How does Rumor Routing strike a compromise between event and query flooding?", a: "Instead of flooding the entire network with events or queries, nodes generate long-lived Agent packets that walk the network updating event tables. Queries wander randomly until intersecting an event path, drastically reducing overhead for moderate query-to-event ratios." },
  { q: "State the Gradient formula in Gradient-Based Routing (GBR).", a: "Gradient = Height_node - Height_neighbor, where Height is the minimum hop count from the node to the Base Station. Packets are forwarded along the link with the largest positive gradient." },
  { q: "List the three traffic balancing schemes used in GBR.", a: "1. Stochastic Scheme (random selection among equal maximum gradients); 2. Energy-Based Scheme (low battery nodes raise height to deflect traffic); 3. Stream-Based Scheme (nodes carrying active streams raise height)." },
  { q: "How does DSDV prevent routing loops?", a: "DSDV uses Destination Sequence Numbers assigned exclusively by the destination node. A route with a higher sequence number always replaces an older one; if equal, the route with smaller distance is chosen." },
  { q: "Differentiate between Full Dump and Incremental packets in DSDV.", a: "A Full Dump carries the entire routing table and is transmitted infrequently. An Incremental Packet contains only routes that have changed since the last full dump, reducing control overhead." },
  { q: "What are Multipoint Relays (MPRs) in OLSR?", a: "MPRs are a selected minimal subset of a node's 1-hop symmetric neighbors that collectively covers all of its 2-hop symmetric neighbors. In OLSR, ONLY MPRs are permitted to retransmit topology control messages." },
  { q: "What is the reply condition for intermediate nodes in AODV?", a: "An intermediate node replies with an RREP only if the sequence number of its cached route to the destination is greater than or equal to the destination sequence number specified in the RREQ packet." },
  { q: "How does DSR differ from AODV in terms of packet headers?", a: "DSR uses Source Routing where the originating sender embeds the complete sequence of intermediate hops directly into the packet header, whereas AODV maintains next-hop routing tables at each node." },
  { q: "Define a Landmark of radius n in Landmark Routing.", a: "A node i for which all other nodes within n hops maintain routing information toward i is defined as a Landmark of radius n. Global landmarks have a radius larger than the network diameter." },
  { q: "How does PEGASIS achieve near-optimal energy conservation?", a: "Nodes form a linear chain using a greedy algorithm. Each node transmits only to its nearest chain neighbor. Data aggregates along the chain, and exactly one designated leader node per round relays to the base station." },
  { q: "Describe the hybrid routing architecture in Safari.", a: "Safari uses a hierarchy of Drums and Cells. Within fundamental cells (Level 1), it uses reactive DSR routing. Between cells, it uses proactive routing following the reverse path of drum beacons." },
  { q: "Define Expected Transmission Count (ETX) and its formula.", a: "ETX is the expected number of MAC transmissions required to deliver a packet over a wireless link: ETX = 1 / (d_f * d_r), where d_f is the forward delivery ratio and d_r is the reverse acknowledgment ratio." }
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
        <h4 class="text-base font-bold text-amber-400">Essay 1: SPIN Protocols Family vs Directed Diffusion Data-Centric Routing [16 Marks]</h4>
        <div class="text-xs text-slate-300 space-y-2 leading-relaxed">
          <p><strong>1. SPIN Architecture (Kulik et al. 2002):</strong> Negotiation-based, data-centric, time-driven routing. Solves flooding deficiencies via: (a) Meta-data negotiation (size x < X, identical data = identical metadata); (b) Internal Resource Manager tracking battery reserves. Operates via 3-way handshake: ADV → REQ → DATA.</p>
          <p><strong>2. SPIN Family Variants:</strong><br>
          • <em>SPIN-PP:</em> Point-to-point lossless links. 1-hop neighbor awareness. Aggregates data at relays.<br>
          • <em>SPIN-EC:</em> Energy-constrained. Nodes only participate in 3-way handshake if battery > safety threshold.<br>
          • <em>SPIN-BC:</em> Broadcast channel. Overcomes collision via random backoff timers; overhearing an identical REQ cancels timer and suppresses REQ. DATA sent once to broadcast address.<br>
          • <em>SPIN-RL:</em> Reliable version for lossy links. Overhears REQ, re-requests on timeout, rate-limits DATA transmissions.</p>
          <p><strong>3. Directed Diffusion (Intanagonwiwat et al. 2000):</strong> Attribute-value pair naming (e.g. type=vehicle, interval=20ms, duration=10s, rect=[-100,-100,200,200]). Three phases: (1) Interest propagation establishing reverse gradients; (2) Initial exploratory data delivery at low rate; (3) Empirical path reinforcement by sink (high-rate interest to best neighbor).</p>
          <p><strong>4. In-Depth Comparison:</strong> SPIN is source-advertised (push); Directed Diffusion is sink-queried (pull). Directed Diffusion inherently enables in-network aggregation and caching along gradient paths, whereas SPIN is optimized for time-driven environmental dissemination.</p>
        </div>
      </div>

      <div class="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-3">
        <h4 class="text-base font-bold text-amber-400">Essay 2: Proactive (DSDV, OLSR) vs Reactive (AODV, DSR) Routing Protocols [16 Marks]</h4>
        <div class="text-xs text-slate-300 space-y-2 leading-relaxed">
          <p><strong>1. DSDV (Perkins & Bhagwat 1994):</strong> Modified Distributed Bellman-Ford. Next hop k = min_j {d_ij^x}. Uses Destination Sequence Numbers assigned by destination to eliminate routing loops. Updates via Full Dumps (complete table, infrequent) and Incremental Packets (changed routes only, low overhead). Replacement rule: higher sequence number, or equal sequence number with smaller hop count. Handles node mobility dynamically (Fig 3: node C moves to H/G, D updates next hop to E, distance 3).</p>
          <p><strong>2. OLSR (Clausen et al. 2001):</strong> Link-state protocol using Multipoint Relays (MPRs). Periodic HELLO sensing detects 1-hop and 2-hop symmetric neighbors. Each node selects a minimal MPR selector set covering all 2-hop neighbors. ONLY MPRs forward topology control (TC) packets, eliminating classic flooding broadcast storms.</p>
          <p><strong>3. AODV (Perkins & Royer 1999):</strong> Reactive distance-vector. Route discovery: source broadcasts RREQ (<Source, BroadcastID, Dest, DestSeqNum, HopCount>). Intermediate nodes set up reverse pointers; reply with unicast RREP only if route SeqNum ≥ DestSeqNum in RREQ. RREP sets forward pointers. RERR packets notify upstream nodes of link breaks.</p>
          <p><strong>4. DSR (Johnson 1994):</strong> Source routing. Complete path stored in packet header; relays need no routing tables. Route Cache stores learned paths. RREQ accumulates visited node addresses; destination replies with full recorded route. Supports asymmetric links and promiscuous route learning.</p>
        </div>
      </div>

      <div class="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-3">
        <h4 class="text-base font-bold text-amber-400">Essay 3: Hierarchical Routing Protocols in WSNs (Landmark, LANMAR, LEACH, PEGASIS, Safari) [16 Marks]</h4>
        <div class="text-xs text-slate-300 space-y-2 leading-relaxed">
          <p><strong>1. Clustering Fundamentals:</strong> Groups nodes to solve scalability, collisions, and energy drain. Cluster Heads (CHs) aggregate member data and forward to sink via single-hop or multi-hop topologies.</p>
          <p><strong>2. Landmark Routing (Tsuchiya 1988) & LANMAR (Gerla et al. 2000):</strong> Landmark of radius n is known to all nodes within n hops. Hierarchical address format LM2.LM1.LM0 routes from coarse to fine resolution. LANMAR integrates Fisheye State Routing (FSR): frequent updates within local fisheye scope, zero outside; forwards to destination subnet landmark.</p>
          <p><strong>3. PEGASIS (Lindsey & Raghavendra 2002):</strong> Chain-based protocol. Greedy nearest-neighbor chain. Nodes transmit only to closest neighbor; data fuses along chain; exactly one rotating leader per round transmits to base station. Delivers 100-300% energy gain over LEACH, but incurs sequential latency.</p>
          <p><strong>4. Safari Architecture (Du et al. 2008):</strong> Self-organizing hierarchy of Drums (landmarks) and Cells (Level 0 node, Level 1 fundamental cells, supercells). Periodic drum beacons provide location and gradients. Hybrid routing: reactive DSR within cells, proactive beacon-reverse routing between cells. Extreme scalability.</p>
        </div>
      </div>

      <div class="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-3">
        <h4 class="text-base font-bold text-amber-400">Essay 4: Energy Routing Metrics & Optimization Formulations (Singh et al. 1998) [16 Marks]</h4>
        <div class="text-xs text-slate-300 space-y-2 leading-relaxed">
          <p><strong>1. Energy as Core Constraint:</strong> Energy dominates WSN design because recharging is infeasible. Five distinct metrics formulated by Singh et al. (1998):</p>
          <p><strong>2. The Five Metrics:</strong><br>
          • <em>Minimum energy consumed per packet:</em> Minimizes sum of Tx and Rx energy along path. (Fig 3: Path A-D-G cost 5 vs B-G cost 6).<br>
          • <em>Maximum time to network partition:</em> Protects cut/bridge nodes whose failure isolates subnetworks. Identified via Max-Flow Min-Cut Theorem. (Fig 3: node D protects F, I, J).<br>
          • <em>Minimum variance in node power levels:</em> Balances energy dissipation equally across all nodes to prevent premature network death.<br>
          • <em>Maximum (average) energy capacity:</em> Selects path with highest total or average battery reserve. (Fig 3: Path C-E-G capacity 8).<br>
          • <em>Maximum minimum energy capacity:</em> max(min(E_residual)) protects the weakest bottleneck node from dying. (Fig 3: Path B-G min capacity 2).</p>
        </div>
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
  { q: "What is the primary cause of the Implosion problem in flooding (Heinzelman et al. 1999)?", opts: ["Hardware clock drift in transceiver", "Duplicate copies of the same packet received by a node from multiple neighbors", "Nodes running out of battery", "Packet collisions at the physical layer"], ans: 1, exp: "Implosion occurs when multiple neighbors rebroadcast the exact same packet to a common node (e.g. B and C both forward P1 to D)." },
  { q: "What is a mandatory requirement for meta-data in the SPIN protocol?", opts: ["Must be encrypted with 256-bit AES", "Size of meta-data x must be strictly less than raw data X (x < X)", "Must contain GPS coordinates", "Must exceed 256 bytes"], ans: 1, exp: "Meta-data negotiation is only beneficial if the meta-data descriptor is significantly smaller than the actual sensor data payload." },
  { q: "How does SPIN-BC suppress redundant request (REQ) packets in a broadcast channel?", opts: ["By applying CSMA/CD collision detection", "Nodes set a random backoff timer; overhearing an identical REQ cancels the timer and suppresses the REQ", "The base station polls nodes sequentially", "Nodes calculate CRC checksums"], ans: 1, exp: "In SPIN-BC, overhearing another node's broadcast REQ suppresses redundant REQ transmissions, and the advertiser transmits DATA only once." },
  { q: "How are data and sensing tasks named in Directed Diffusion?", opts: ["32-bit IPv4 addresses", "Attribute-value pairs (e.g., type=vehicle, interval=20ms)", "MAC-layer hardware addresses", "Random hash keys"], ans: 1, exp: "Directed diffusion uses attribute-value pairs to describe sensing tasks and steer data delivery without global node IP addresses." },
  { q: "In Gradient-Based Routing (GBR), how is the gradient of a wireless link defined?", opts: ["Height_node - Height_neighbor", "Height_node * Height_neighbor", "Residual_Energy / Hop_Count", "ETX * Bandwidth"], ans: 0, exp: "Gradient is defined as the height of the node minus the height of its neighbor, where height is the minimum hop count to the base station." },
  { q: "Which traffic balancing scheme in GBR defers traffic by artificially increasing a node's height when battery is low?", opts: ["Stochastic scheme", "Energy-based scheme", "Stream-based scheme", "Multipath scheme"], ans: 1, exp: "In GBR's energy-based scheme, a node with low battery artificially raises its height, reducing the incoming gradient and deflecting traffic away." },
  { q: "What mathematical theorem is used to find the minimal set of nodes whose removal partitions a network?", opts: ["Nyquist-Shannon Theorem", "Max-Flow Min-Cut Theorem", "Bayes' Theorem", "Bellman-Ford Theorem"], ans: 1, exp: "The Max-Flow Min-Cut Theorem is used to identify critical bridge/cut nodes whose depletion partitions the network into disconnected subnetworks." },
  { q: "In DSDV, what mechanism guarantees loop-free routing?", opts: ["Time-To-Live hop limits", "Destination Sequence Numbers assigned exclusively by the destination node", "Reverse path pointers", "Distance vector poisoning"], ans: 1, exp: "Destination Sequence Numbers ensure nodes can always distinguish between fresh and stale routes, completely eliminating routing loops." },
  { q: "What is the primary role of Multipoint Relays (MPRs) in OLSR?", opts: ["They act as cluster heads and decode CDMA", "ONLY nodes selected as MPRs are permitted to forward topology control (TC) messages", "They calculate clock synchronization drift", "They replace all sensor batteries"], ans: 1, exp: "In OLSR, only MPRs rebroadcast topology control packets, which eliminates broadcast storms while ensuring full 2-hop coverage." },
  { q: "Under what condition will an intermediate node in AODV reply to an incoming RREQ with an RREP?", opts: ["If it has at least 50% battery remaining", "If the sequence number of its route to the destination is >= the destination sequence number in RREQ", "If it is an elected cluster head", "If the hop count in RREQ is zero"], ans: 1, exp: "An intermediate node replies only if its route is fresh enough, meaning its cached destination sequence number is greater than or equal to that in the RREQ." },
  { q: "Which routing protocol embeds the entire sequence of intermediate hops directly into the packet header?", opts: ["AODV", "Dynamic Source Routing (DSR)", "DSDV", "LEACH"], ans: 1, exp: "DSR uses Source Routing where the originating sender writes the complete intermediate path into the packet header." },
  { q: "In Landmark Routing, what is a Landmark of radius n?", opts: ["A node with n antennas", "A node for which all other nodes within n hops maintain routing information toward it", "A base station located n meters underground", "A node with n battery cells"], ans: 1, exp: "A node i for which all nodes within n hops know a route toward i is defined as a landmark of radius n." },
  { q: "How does PEGASIS organize sensor nodes for data gathering?", opts: ["In concentric cluster circles", "In a linear chain constructed using a greedy algorithm", "In a quad-tree virtual grid", "In a random gossip mesh"], ans: 1, exp: "PEGASIS organizes all nodes into a single linear chain where nodes transmit only to closest neighbors and take turns relaying to the base station." },
  { q: "What hybrid routing approach is employed in the Safari Architecture?", opts: ["Flooding inside cells and Gossiping between cells", "Reactive DSR within fundamental cells, and proactive reverse-beacon routing between cells", "AODV within cells and GPSR between cells", "LEACH within cells and PEGASIS between cells"], ans: 1, exp: "Safari uses reactive DSR within fundamental cells (Level 1) and proactive routing following the reverse path of drum beacons for inter-cell communication." },
  { q: "What is the formula for Expected Transmission Time (ETT) proposed by Draves et al. (2004)?", opts: ["ETT = ETX * (S / B)", "ETT = ETX / (S * B)", "ETT = (d_f * d_r) / S", "ETT = Bandwidth / Packet_Size"], ans: 0, exp: "ETT = ETX * (S / B), where S is the average packet size in bytes and B is the link bandwidth in bytes per second." }
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
