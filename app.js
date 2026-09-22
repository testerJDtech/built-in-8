"use strict";
/* =========================================================================
   1. STATIC PLAN DATA — taken verbatim from John's plan. Nothing invented.
   ========================================================================= */
var PROG_NOTE = "Progress by adding reps, slowing the lowering phase, using a stronger band or adding backpack load. Stop most sets with 1-3 good reps still available.";

var BASE_WORKOUTS = {
  A: { id:"A", name:"Strength A", kind:"strength", note:PROG_NOTE, ex:[
    {name:"Bodyweight/backpack squat", sets:3, reps:"10-15"},
    {name:"Push-ups", sets:3, reps:"6-15"},
    {name:"Resistance-band row", sets:3, reps:"10-15"},
    {name:"Band/backpack Romanian deadlift", sets:3, reps:"10-15"},
    {name:"Band overhead press", sets:3, reps:"8-12"},
    {name:"Plank", sets:3, reps:"30-60 sec"},
    {name:"Optional curls", sets:2, reps:"12-15", opt:true}
  ]},
  B: { id:"B", name:"Strength B", kind:"strength", note:PROG_NOTE, ex:[
    {name:"Bulgarian split squat", sets:3, reps:"8-12 each leg"},
    {name:"Push-up variation", sets:3, reps:"8-15"},
    {name:"Band lat pulldown/high row", sets:3, reps:"10-15"},
    {name:"Glute bridge", sets:3, reps:"12-20"},
    {name:"Pike push-up", sets:3, reps:"6-12"},
    {name:"Band face pull", sets:2, reps:"15-20"},
    {name:"Side plank", sets:3, reps:"30-45 sec each"}
  ]},
  C: { id:"C", name:"Strength C", kind:"strength", note:PROG_NOTE, ex:[
    {name:"Reverse lunge", sets:3, reps:"10 each leg"},
    {name:"Push-ups", sets:3, reps:"8-15"},
    {name:"Single-arm band/backpack row", sets:3, reps:"12 each side"},
    {name:"Single-leg Romanian deadlift", sets:3, reps:"10 each"},
    {name:"Band chest press", sets:3, reps:"10-15"},
    {name:"Biceps curl", sets:2, reps:"12-15"},
    {name:"Triceps extension", sets:2, reps:"12-15"},
    {name:"Dead bug", sets:3, reps:"10 each side"}
  ]},
  circuit: { id:"circuit", name:"20-minute busy-day circuit", kind:"circuit",
    note:"Complete 3 rounds at a steady pace. Rest 60-90 seconds between rounds. Use this when a full workout is unrealistic, not as punishment for missing a session.", ex:[
    {name:"Squats", sets:3, reps:"15"},
    {name:"Push-ups", sets:3, reps:"8-12"},
    {name:"Band rows", sets:3, reps:"15"},
    {name:"Reverse lunges", sets:3, reps:"10 each leg"},
    {name:"Plank", sets:3, reps:"30 sec"}
  ]},
  run:   { id:"run",   name:"Run",  kind:"cardio", ex:[] },
  walk:  { id:"walk",  name:"Walk", kind:"cardio", ex:[] },
  sport: { id:"sport", name:"Sport",kind:"cardio", ex:[] },
  rest:  { id:"rest",  name:"Rest", kind:"rest",   ex:[] }
};

var MEALS = [
  {key:"breakfast", name:"Breakfast",    time:"7:00-8:30",   goal:"Start with protein + slow carbs/fruit"},
  {key:"lunch",     name:"Lunch",        time:"12:00-13:30", goal:"Prepared meal; protein + carb + vegetables"},
  {key:"snack",     name:"Planned snack",time:"15:30-17:00", goal:"Protein + fruit; useful before training"},
  {key:"dinner",    name:"Dinner",       time:"18:30-20:30", goal:"Protein + carb + vegetables; move earlier on Tuesday/Wednesday"}
];

var SPORTS = ["Football","Badminton","BJJ","Boxing","Tennis","Basketball","Swimming"];

/* Food library. Composite "portion" items are John's own meal preps, breakfasts
   and snacks. Per-100g values are standard reference figures and every one of
   them is editable when logging. */
var FOODS = [
  // --- protein ---
  {id:"f1", n:"Chicken breast (raw)", c:"Protein", u:"g", kcal:106, p:24, cb:0, f:1.2, q:190},
  {id:"f2", n:"Chicken, cooked/ready", c:"Protein", u:"g", kcal:165, p:31, cb:0, f:3.6, q:150},
  {id:"f3", n:"Turkey mince, lean (raw)", c:"Protein", u:"g", kcal:137, p:21.5, cb:0, f:5, q:175},
  {id:"f4", n:"Beef mince, lean 5% (raw)", c:"Protein", u:"g", kcal:137, p:21, cb:0, f:5, q:175},
  {id:"f5", n:"Eggs, whole", c:"Protein", u:"g", kcal:143, p:12.6, cb:0.7, f:9.5, q:150},
  {id:"f6", n:"Tuna in spring water, drained", c:"Protein", u:"g", kcal:116, p:26, cb:0, f:1, q:100},
  {id:"f7", n:"Salmon fillet (raw)", c:"Protein", u:"g", kcal:208, p:20, cb:0, f:13, q:150},
  {id:"f8", n:"Greek yoghurt, 0% fat", c:"Protein", u:"g", kcal:57, p:10, cb:3.6, f:0.4, q:200},
  {id:"f9", n:"Skyr / high-protein yoghurt", c:"Protein", u:"g", kcal:63, p:11, cb:4, f:0.2, q:200},
  {id:"f10", n:"Cottage cheese, low fat", c:"Protein", u:"g", kcal:72, p:12.5, cb:3.5, f:1.5, q:200},
  {id:"f11", n:"Whey protein powder", c:"Protein", u:"g", kcal:380, p:78, cb:7, f:5, q:30},
  // --- carbs ---
  {id:"f20", n:"Basmati rice (dry)", c:"Carbs", u:"g", kcal:349, p:8.5, cb:78, f:0.9, q:80},
  {id:"f21", n:"Microwave rice pouch", c:"Carbs", u:"g", kcal:150, p:3.3, cb:30, f:1.5, q:250},
  {id:"f22", n:"Potatoes (raw)", c:"Carbs", u:"g", kcal:77, p:2, cb:17, f:0.1, q:300},
  {id:"f23", n:"Oats", c:"Carbs", u:"g", kcal:379, p:13, cb:67, f:7, q:60},
  {id:"f24", n:"Pasta (dry)", c:"Carbs", u:"g", kcal:352, p:12, cb:71, f:1.5, q:80},
  {id:"f25", n:"Wholemeal bread", c:"Carbs", u:"slice", kcal:100, p:4.5, cb:16, f:1.2, q:2},
  {id:"f26", n:"Wholemeal wrap", c:"Carbs", u:"wrap", kcal:160, p:5.5, cb:27, f:3.5, q:1},
  {id:"f27", n:"Kidney beans, drained", c:"Carbs", u:"g", kcal:100, p:7, cb:15, f:0.5, q:60},
  // --- veg & fruit ---
  {id:"f40", n:"Broccoli", c:"Veg & fruit", u:"g", kcal:34, p:2.8, cb:4, f:0.4, q:200},
  {id:"f41", n:"Frozen mixed vegetables", c:"Veg & fruit", u:"g", kcal:42, p:2.5, cb:6, f:0.5, q:200},
  {id:"f42", n:"Peppers", c:"Veg & fruit", u:"g", kcal:26, p:1, cb:4.6, f:0.3, q:100},
  {id:"f43", n:"Onion", c:"Veg & fruit", u:"g", kcal:40, p:1.1, cb:8, f:0.1, q:80},
  {id:"f44", n:"Spinach", c:"Veg & fruit", u:"g", kcal:23, p:2.9, cb:1.4, f:0.4, q:80},
  {id:"f45", n:"Tomatoes", c:"Veg & fruit", u:"g", kcal:18, p:0.9, cb:3.4, f:0.2, q:100},
  {id:"f46", n:"Salad bag", c:"Veg & fruit", u:"g", kcal:17, p:1.4, cb:2, f:0.3, q:80},
  {id:"f47", n:"Cucumber", c:"Veg & fruit", u:"g", kcal:15, p:0.7, cb:3.6, f:0.1, q:100},
  {id:"f48", n:"Banana", c:"Veg & fruit", u:"g", kcal:89, p:1.1, cb:23, f:0.3, q:120},
  {id:"f49", n:"Apple", c:"Veg & fruit", u:"g", kcal:52, p:0.3, cb:14, f:0.2, q:150},
  {id:"f50", n:"Orange / easy peeler", c:"Veg & fruit", u:"g", kcal:47, p:0.9, cb:12, f:0.1, q:130},
  {id:"f51", n:"Frozen berries", c:"Veg & fruit", u:"g", kcal:45, p:0.8, cb:9, f:0.3, q:100},
  // --- flavour ---
  {id:"f60", n:"Passata / chopped tomatoes", c:"Flavour", u:"g", kcal:35, p:1.5, cb:6, f:0.2, q:150},
  {id:"f61", n:"Salsa", c:"Flavour", u:"g", kcal:36, p:1.5, cb:7, f:0.2, q:30},
  {id:"f62", n:"Light mayo", c:"Flavour", u:"g", kcal:245, p:0.9, cb:8, f:23, q:15},
  {id:"f63", n:"Olive oil", c:"Flavour", u:"g", kcal:884, p:0, cb:0, f:100, q:10},
  {id:"f64", n:"Dry spices (Cajun, jerk, curry, paprika, garlic, chilli, herbs)", c:"Flavour", u:"g", kcal:0, p:0, cb:0, f:0, q:5},
  // --- meal preps (per portion) ---
  {id:"m1", n:"Meal Prep A — Cajun chicken rice bowl", c:"My meals", u:"portion", kcal:570, p:58, cb:73, f:4, q:1,
    d:"190g raw chicken breast, 80g dry basmati, 200g broccoli/mixed veg, salsa"},
  {id:"m2", n:"Meal Prep B — Turkey/beef chilli bowl", c:"My meals", u:"portion", kcal:620, p:51, cb:72, f:10, q:1,
    d:"175g raw lean mince, 300g potatoes, peppers + onion, passata, kidney beans"},
  {id:"m3", n:"Protein overnight oats", c:"My meals", u:"portion", kcal:540, p:37, cb:86, f:5, q:1,
    d:"60g oats, 250g Skyr, frozen berries, banana"},
  {id:"m4", n:"Egg breakfast", c:"My meals", u:"portion", kcal:495, p:29, cb:54, f:17, q:1,
    d:"3 eggs, 2 slices wholemeal toast, fruit"},
  {id:"m5", n:"Quick breakfast", c:"My meals", u:"portion", kcal:420, p:29, cb:69, f:4, q:1,
    d:"High-protein yoghurt, oats, banana, berries"},
  // --- planned snack options (per portion) ---
  {id:"s1", n:"Skyr + fruit", c:"Snacks", u:"portion", kcal:235, p:23, cb:35, f:1, q:1},
  {id:"s2", n:"Greek yoghurt + berries", c:"Snacks", u:"portion", kcal:160, p:21, cb:16, f:1, q:1},
  {id:"s3", n:"Protein shake + banana", c:"Snacks", u:"portion", kcal:220, p:25, cb:29, f:2, q:1},
  {id:"s4", n:"2 boiled eggs + fruit", c:"Snacks", u:"portion", kcal:220, p:13, cb:22, f:10, q:1},
  {id:"s5", n:"Cottage cheese + fruit", c:"Snacks", u:"portion", kcal:220, p:26, cb:28, f:3, q:1},
  {id:"s6", n:"Tuna wrap (bigger snack)", c:"Snacks", u:"portion", kcal:320, p:32, cb:29, f:8, q:1},
  // --- rescue meals (per portion) ---
  {id:"r1", n:"Rescue 1 — ready chicken + rice + salad", c:"Rescue", u:"portion", kcal:640, p:56, cb:77, f:9, q:1},
  {id:"r2", n:"Rescue 2 — tuna + rice + salad", c:"Rescue", u:"portion", kcal:620, p:61, cb:77, f:6, q:1},
  {id:"r3", n:"Rescue 3 — chicken + wraps + salad + salsa", c:"Rescue", u:"portion", kcal:590, p:58, cb:58, f:13, q:1},
  {id:"r4", n:"Rescue 4 — eggs + potatoes/rice + veg", c:"Rescue", u:"portion", kcal:530, p:30, cb:63, f:15, q:1},
  {id:"r5", n:"Planned takeaway", c:"Rescue", u:"portion", kcal:900, p:35, cb:90, f:40, q:1,
    d:"Estimate only — edit the numbers to match what you actually ate."}
];

/* Week 1 — exactly as John wrote it. */
function week1(){
  return {
    id:"w1", num:1, start:"2026-09-21", mealPrepDone:false, takeaways:0, notes:"",
    days:[
      {date:"2026-09-21", wid:"A",       label:"Strength A",                                          target:"40-50 min", when:"After work", sport:"", note:""},
      {date:"2026-09-22", wid:"walk",    label:"Walk at lunchtime",                                   target:"30-40 min", when:"Lunchtime",  sport:"", note:""},
      {date:"2026-09-23", wid:"walk",    label:"Walk during lunch",                                   target:"30-40 min", when:"Lunchtime",  sport:"", note:""},
      {date:"2026-09-24", wid:"B",       label:"Strength B",                                          target:"40-50 min", when:"After work", sport:"", note:""},
      {date:"2026-09-25", wid:"C",       label:"Back & calisthenics, weighted dips (Strength C)",     target:"40-50 min", when:"",           sport:"", note:""},
      {date:"2026-09-26", wid:"run",     label:"Easy run",                                            target:"3-4 km",    when:"",           sport:"", note:"Don't focus on the time."},
      {date:"2026-09-27", wid:"rest",    label:"Rest and meal prep",                                  target:"",          when:"",           sport:"", note:""}
    ]
  };
}

var DEFAULT_SETTINGS = {
  kcalMin:2250, kcalMax:2400, proMin:150, proMax:170, steps:6500,
  mealTimes:{breakfast:"07:30", lunch:"12:30", snack:"16:00", dinner:"19:00"},
  theme:"auto", showFat:true
};

/* =========================================================================
   2. HELPERS
   ========================================================================= */
var DOW = ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];
var MONTH = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];

function iso(d){ var m=d.getMonth()+1, day=d.getDate();
  return d.getFullYear()+"-"+(m<10?"0"+m:m)+"-"+(day<10?"0"+day:day); }
function parseISO(s){ var p=String(s).split("-"); return new Date(+p[0], +p[1]-1, +p[2]); }
function addDays(s,n){ var d=parseISO(s); d.setDate(d.getDate()+n); return iso(d); }
function todayISO(){ return iso(new Date()); }
function fmtDate(s){ var d=parseISO(s); return DOW[d.getDay()]+" "+d.getDate()+" "+MONTH[d.getMonth()]; }
function fmtShort(s){ var d=parseISO(s); return d.getDate()+" "+MONTH[d.getMonth()]; }
function n0(x){ return Math.round(x||0); }
function n1(x){ x=Math.round((x||0)*10)/10; return String(x); }
function clamp(x,a,b){ return x<a?a:(x>b?b:x); }
function uid(){ return Date.now().toString(36)+Math.random().toString(36).slice(2,7); }
function now(){ return Date.now(); }
function deep(o){ return JSON.parse(JSON.stringify(o)); }

function h(tag, attrs){
  var el = document.createElement(tag), i, k, kids = [].slice.call(arguments, 2);
  if(attrs) for(k in attrs){
    if(!Object.prototype.hasOwnProperty.call(attrs,k)) continue;
    var v = attrs[k];
    if(v === null || v === undefined || v === false) continue;
    if(k === "class") el.className = v;
    else if(k === "text") el.textContent = v;
    else if(k === "html") el.innerHTML = v;
    else if(k.slice(0,2) === "on") el.addEventListener(k.slice(2), v);
    else if(k === "value") el.value = v;
    else if(k === "checked") el.checked = !!v;
    else el.setAttribute(k, v === true ? "" : v);
  }
  for(i=0;i<kids.length;i++) addKid(el, kids[i]);
  return el;
}
function addKid(el, k){
  if(k === null || k === undefined || k === false) return;
  if(Array.isArray(k)){ for(var i=0;i<k.length;i++) addKid(el,k[i]); return; }
  el.appendChild(typeof k === "object" ? k : document.createTextNode(String(k)));
}
function svg(d, extra){
  var s = document.createElementNS("http://www.w3.org/2000/svg","svg");
  s.setAttribute("viewBox","0 0 24 24"); s.setAttribute("width", (extra&&extra.size)||18);
  s.setAttribute("height",(extra&&extra.size)||18);
  s.setAttribute("fill","none"); s.setAttribute("stroke","currentColor");
  s.setAttribute("stroke-width", (extra&&extra.w)||2.4);
  s.setAttribute("stroke-linecap","round"); s.setAttribute("stroke-linejoin","round");
  var p = document.createElementNS("http://www.w3.org/2000/svg","path");
  p.setAttribute("d", d); s.appendChild(p); return s;
}
var ICONS = {
  check:"M4 12.5l5 5L20 6.5",
  today:"M4 6h16M4 12h16M4 18h10",
  food:"M6 3v8a3 3 0 006 0V3M9 11v10M17 3c-1.5 3-1.5 6 0 9v9",
  train:"M4 9v6M20 9v6M7 7v10M17 7v10M7 12h10",
  weeks:"M4 5h16v15H4zM4 10h16M9 5v15M15 5v15",
  chart:"M4 20V9M10 20V4M16 20v-7M22 20H2",
  x:"M6 6l12 12M18 6L6 18",
  plus:"M12 5v14M5 12h14",
  back:"M15 5l-7 7 7 7",
  fwd:"M9 5l7 7-7 7",
  cog:"M12 9a3 3 0 100 6 3 3 0 000-6M19 12a7 7 0 00-.1-1.2l2-1.5-2-3.4-2.3 1a7 7 0 00-2-1.2L14.2 3H9.8l-.4 2.7a7 7 0 00-2 1.2l-2.3-1-2 3.4 2 1.5a7 7 0 000 2.4l-2 1.5 2 3.4 2.3-1a7 7 0 002 1.2l.4 2.7h4.4l.4-2.7a7 7 0 002-1.2l2.3 1 2-3.4-2-1.5A7 7 0 0019 12"
};
/* =========================================================================
   3. STORE — local first, always. The device is the source of truth while
      offline; the cloud copy catches up when a connection comes back.
   ========================================================================= */
var LS_KEY = "bi8.store.v1";
var S = null;

function freshStore(){
  return {
    v:1,
    plan:{ settings:deep(DEFAULT_SETTINGS), weeks:[week1()], workouts:{}, myFoods:[], updatedAt:now() },
    days:{},
    dirty:{}
  };
}
function loadLocal(){
  try{
    var raw = localStorage.getItem(LS_KEY);
    if(!raw) return freshStore();
    var o = JSON.parse(raw);
    if(!o || !o.plan || !o.plan.settings) return freshStore();
    if(!o.days) o.days = {};
    if(!o.dirty) o.dirty = {};
    if(!o.plan.workouts) o.plan.workouts = {};
    if(!o.plan.myFoods) o.plan.myFoods = [];
    if(!o.plan.weeks || !o.plan.weeks.length) o.plan.weeks = [week1()];
    var k; for(k in DEFAULT_SETTINGS){ if(o.plan.settings[k] === undefined) o.plan.settings[k] = DEFAULT_SETTINGS[k]; }
    return o;
  }catch(e){ return freshStore(); }
}
var saveTimer = null;
function saveLocal(){
  if(saveTimer) return;
  saveTimer = setTimeout(function(){
    saveTimer = null;
    try{ localStorage.setItem(LS_KEY, JSON.stringify(S)); }
    catch(e){ toast("Storage is full on this device. Older days may not be saved."); }
  }, 150);
}

function blankDay(date){
  return { date:date, food:[], sessions:{}, meals:{}, weight:null, waist:null, steps:null, note:"", updatedAt:now() };
}
function day(date){
  if(!S.days[date]) S.days[date] = blankDay(date);
  return S.days[date];
}
function touchDay(date){
  var d = day(date); d.updatedAt = now();
  S.dirty["days/"+date] = true; saveLocal(); scheduleFlush();
}
function touchPlan(){
  S.plan.updatedAt = now();
  S.dirty["app/plan"] = true; saveLocal(); scheduleFlush();
}

/* ---- workouts: base library plus John's own additions/edits ---- */
function allWorkouts(){
  var out = {}, k;
  for(k in BASE_WORKOUTS) out[k] = BASE_WORKOUTS[k];
  for(k in S.plan.workouts) out[k] = S.plan.workouts[k];
  return out;
}
function workout(id){ return allWorkouts()[id] || null; }

/* ---- foods: library plus John's own saved foods ---- */
function allFoods(){ return FOODS.concat(S.plan.myFoods || []); }
function food(id){
  var a = allFoods(), i;
  for(i=0;i<a.length;i++) if(a[i].id === id) return a[i];
  return null;
}

/* =========================================================================
   4. SYNC — one document for the plan, one per day. Last write wins by
      timestamp, compared per document, so two devices can both go offline.
   ========================================================================= */
var DB = null, UNSUBS = [], flushTimer = null, flushing = false, SYNCERR = "";

function syncStatus(){
  var dirtyCount = Object.keys(S.dirty).length;
  if(!DB) return { cls:"", label:"Saved on device" };
  if(!navigator.onLine) return { cls:"off", label: dirtyCount ? "Offline — "+dirtyCount+" to sync" : "Offline" };
  if(SYNCERR) return { cls:"wait", label:"Retrying sync" };
  if(dirtyCount || flushing) return { cls:"wait", label:"Syncing" };
  return { cls:"ok", label:"Synced" };
}
function docFor(path){
  if(path === "app/plan") return deep(S.plan);
  var d = path.slice(5);
  return S.days[d] ? deep(S.days[d]) : null;
}
function scheduleFlush(){
  paintStatus();
  if(!DB || flushTimer) return;
  flushTimer = setTimeout(function(){ flushTimer = null; flush(); }, 1200);
}
function flush(){
  if(!DB || flushing) return;
  var paths = Object.keys(S.dirty);
  if(!paths.length){ paintStatus(); return; }
  if(!navigator.onLine){ paintStatus(); return; }
  flushing = true; paintStatus();
  var i = 0;
  function step(){
    if(i >= paths.length){
      flushing = false; SYNCERR = ""; saveLocal(); paintStatus();
      if(Object.keys(S.dirty).length) scheduleFlush();
      return;
    }
    var path = paths[i++], body = docFor(path);
    if(!body){ delete S.dirty[path]; return step(); }
    DB.doc(path).set(body).then(function(){
      delete S.dirty[path]; step();
    }, function(err){
      flushing = false;
      if(err && err.code === "invalid_argument"){ delete S.dirty[path]; SYNCERR = ""; }
      else { SYNCERR = (err && err.code) || "unavailable"; }
      saveLocal(); paintStatus();
      setTimeout(function(){ if(Object.keys(S.dirty).length) flush(); }, 8000);
    });
  }
  step();
}
function adoptPlan(remote){
  if(!remote || typeof remote.updatedAt !== "number") return false;
  if(remote.updatedAt <= (S.plan.updatedAt || 0)) return false;
  if(!remote.settings || !remote.weeks) return false;
  S.plan = remote;
  var k; for(k in DEFAULT_SETTINGS){ if(S.plan.settings[k] === undefined) S.plan.settings[k] = DEFAULT_SETTINGS[k]; }
  if(!S.plan.workouts) S.plan.workouts = {};
  if(!S.plan.myFoods) S.plan.myFoods = [];
  delete S.dirty["app/plan"];
  return true;
}
function adoptDay(remote){
  if(!remote || !remote.date || typeof remote.updatedAt !== "number") return false;
  var loc = S.days[remote.date];
  if(loc && (loc.updatedAt || 0) >= remote.updatedAt) return false;
  if(!remote.food) remote.food = [];
  if(!remote.sessions) remote.sessions = {};
  if(!remote.meals) remote.meals = {};
  S.days[remote.date] = remote;
  delete S.dirty["days/"+remote.date];
  return true;
}
function startSync(){
  var changed = false;
  DB.doc("app/plan").get().then(function(snap){
    if(snap.exists){ if(adoptPlan(snap.data())) changed = true; }
    else { S.dirty["app/plan"] = true; }   // nothing up there yet: seed it from this device
    return DB.collection("days").limit(1000).get();
  }).then(function(qs){
    var remote = {};
    if(qs) qs.docs.forEach(function(d){
      var body = d.data();
      if(body && body.date) remote[body.date] = true;
      if(adoptDay(body)) changed = true;
    });
    // any day logged on this device that the cloud has never seen goes up
    Object.keys(S.days).forEach(function(dt){
      if(remote[dt]) return;
      var d = S.days[dt];
      if(d.food.length || Object.keys(d.sessions).length || d.weight != null
         || d.waist != null || d.steps != null || Object.keys(d.meals).length)
        S.dirty["days/"+dt] = true;
    });
    if(changed){ saveLocal(); render(); }
    subscribe();
    flush();
  })["catch"](function(err){
    SYNCERR = (err && err.code) || "unavailable";
    paintStatus();
    setTimeout(startSync, 10000);
  });
}
function subscribe(){
  UNSUBS.forEach(function(u){ try{ u(); }catch(e){} });
  UNSUBS = [];
  UNSUBS.push(DB.doc("app/plan").onSnapshot(function(snap){
    if(snap.exists && adoptPlan(snap.data())){ saveLocal(); render(); }
  }, function(){ /* listener dead; periodic flush still pushes local changes */ }));
  UNSUBS.push(DB.collection("days").limit(1000).onSnapshot(function(qs){
    var changed = false;
    qs.docChanges().forEach(function(ch){
      if(ch.type === "removed") return;
      if(adoptDay(ch.doc.data())) changed = true;
    });
    if(changed){ saveLocal(); render(); }
  }, function(){}));
}
function initSync(){
  if(!window.claude || !window.claude.use) { paintStatus(); return; }
  window.claude.use("db").then(function(db){
    if(!db){ paintStatus(); return; }
    DB = db; paintStatus(); startSync();
  })["catch"](function(){ paintStatus(); });
}
window.addEventListener("online", function(){ SYNCERR=""; paintStatus(); flush(); });
window.addEventListener("offline", paintStatus);
setInterval(function(){ if(DB && navigator.onLine && Object.keys(S.dirty).length) flush(); }, 25000);

/* =========================================================================
   5. TOTALS
   ========================================================================= */
function entryTotals(list){
  var t = {kcal:0,p:0,cb:0,f:0}, i;
  for(i=0;i<list.length;i++){
    t.kcal += list[i].kcal||0; t.p += list[i].p||0; t.cb += list[i].cb||0; t.f += list[i].f||0;
  }
  return t;
}
function dayTotals(date){ return entryTotals((S.days[date] && S.days[date].food) || []); }
function mealTotals(date, key){
  var f = ((S.days[date]&&S.days[date].food)||[]).filter(function(e){ return e.meal===key; });
  return entryTotals(f);
}
function weekOf(date){
  var w = S.plan.weeks, i, j;
  for(i=0;i<w.length;i++) for(j=0;j<w[i].days.length;j++) if(w[i].days[j].date===date) return w[i];
  return null;
}
function dayPlan(date){
  var w = weekOf(date), i;
  if(!w) return null;
  for(i=0;i<w.days.length;i++) if(w.days[i].date===date) return w.days[i];
  return null;
}
function sessionDone(date, wid){
  var d = S.days[date];
  return !!(d && d.sessions && d.sessions[wid] && d.sessions[wid].done);
}
/* A session is one of three things: done, deliberately not done ("missed"),
   or simply not answered yet. The third is silence, not a failure. */
function sessionMissed(date, wid){
  var d = S.days[date];
  return !!(d && d.sessions && d.sessions[wid] && !d.sessions[wid].done
            && d.sessions[wid].status === "missed");
}
function sessionStatus(date, wid){
  if(sessionDone(date, wid)) return "done";
  if(sessionMissed(date, wid)) return "missed";
  return "";
}
function setSessionStatus(date, wid, status){
  var sess = ensureSession(date, wid);
  if(sessionStatus(date, wid) === status) status = "";   // tapping the same answer clears it
  sess.done = status === "done";
  sess.status = status;
  if(status !== "missed") sess.missReason = "";
  touchDay(date);
  return status;
}
function weekSessionCount(w){
  var n = 0;
  w.days.forEach(function(dp){
    var wk = workout(dp.wid);
    if(wk && wk.kind === "strength" && sessionDone(dp.date, dp.wid)) n++;
  });
  return n;
}
function weekCardioCount(w){
  var n = 0;
  w.days.forEach(function(dp){
    var wk = workout(dp.wid);
    if(wk && (wk.kind === "cardio" || wk.kind === "circuit") && sessionDone(dp.date, dp.wid)) n++;
  });
  return n;
}
function weekMissedCount(w){
  var n = 0;
  w.days.forEach(function(dp){
    if(dp.wid === "rest") return;
    if(sessionMissed(dp.date, dp.wid)) n++;
  });
  return n;
}
/* Planned sessions with no answer at all, and only for days already gone. */
function weekOpenCount(w){
  var n = 0, t = todayISO();
  w.days.forEach(function(dp){
    if(dp.wid === "rest" || dp.date >= t) return;
    if(!sessionStatus(dp.date, dp.wid)) n++;
  });
  return n;
}
/* Every session marked "didn't do it", newest first — the honest list. */
function missedList(){
  var out = [];
  S.plan.weeks.forEach(function(w){
    w.days.forEach(function(dp){
      if(dp.wid === "rest" || !sessionMissed(dp.date, dp.wid)) return;
      var wk = workout(dp.wid) || BASE_WORKOUTS.rest;
      out.push({ date:dp.date, weekNum:w.num, label:dp.label || wk.name, kind:wk.kind,
                 reason:(S.days[dp.date].sessions[dp.wid].missReason || "") });
    });
  });
  out.sort(function(a,b){ return a.date < b.date ? 1 : -1; });
  return out;
}
function missReasonTally(){
  var counts = {}, list = missedList(), i, r;
  for(i=0;i<list.length;i++){
    r = list[i].reason || "No reason given";
    counts[r] = (counts[r]||0)+1;
  }
  return Object.keys(counts).map(function(k){ return {reason:k, n:counts[k]}; })
    .sort(function(a,b){ return b.n - a.n; });
}
var MISS_REASONS = ["No time","Too tired","Unwell or sore","Away from home","Work ran over","Chose not to"];
/* =========================================================================
   6. VIEW STATE + RENDER ENGINE
   ========================================================================= */
var V = { tab:"today", date: todayISO(), sheet:null, weekId:null, editingWid:null, search:"", mealFilter:null };
var toastTimer = null;

function toast(msg, actionLabel, onAction){
  var old = document.querySelector(".toast"); if(old) old.remove();
  var t = h("div",{class:"toast",role:"status"}, h("span",{text:msg}));
  if(actionLabel && onAction)
    t.appendChild(h("button",{class:"toast-act",onclick:function(){
      t.remove(); onAction();
    }, text:actionLabel}));
  document.body.appendChild(t);
  if(toastTimer) clearTimeout(toastTimer);
  toastTimer = setTimeout(function(){ t.remove(); }, actionLabel ? 6000 : 2600);
}
function go(tab){ V.tab = tab; V.sheet = null; window.scrollTo(0,0); render(); }
function openSheet(s){ V.sheet = s; render(); }
function closeSheet(){ V.sheet = null; render(); }

function paintStatus(){
  var el = document.getElementById("syncpill");
  if(!el) return;
  var st = syncStatus();
  el.innerHTML = "";
  el.appendChild(h("span",{class:"dot "+st.cls}));
  el.appendChild(document.createTextNode(st.label));
}

function captureFocus(){
  var a = document.activeElement;
  if(!a || !a.getAttribute) return null;
  var fk = a.getAttribute("data-fk");
  if(!fk) return null;
  var o = {fk:fk};
  try{ o.start = a.selectionStart; o.end = a.selectionEnd; }catch(e){}
  return o;
}
function restoreFocus(f){
  if(!f) return;
  var el = document.querySelector('[data-fk="'+f.fk+'"]');
  if(!el) return;
  el.focus();
  if(f.start != null){ try{ el.setSelectionRange(f.start, f.end); }catch(e){} }
}

function render(){
  var f = captureFocus();
  var scrollY = window.scrollY;
  var app = document.getElementById("app");
  app.innerHTML = "";
  app.appendChild(topBar());
  var body;
  if(V.tab === "today") body = screenToday();
  else if(V.tab === "food") body = screenFood();
  else if(V.tab === "train") body = screenTrain();
  else if(V.tab === "weeks") body = screenWeeks();
  else body = screenProgress();
  app.appendChild(body);
  renderNav();
  var scrim = document.querySelector(".scrim"); if(scrim) scrim.remove();
  if(V.sheet) document.body.appendChild(buildSheet(V.sheet));
  paintStatus();
  restoreFocus(f);
  if(!V.sheet) window.scrollTo(0, scrollY);
}

function topBar(){
  var st = syncStatus();
  return h("header",{class:"top"},
    h("div",{class:"top-row"},
      h("div",{class:"brand"}, "Built in 8 ", h("span",{},"/ John")),
      h("div",{class:"spacer"}),
      h("div",{class:"pill",id:"syncpill"}, h("span",{class:"dot "+st.cls}), st.label),
      h("button",{class:"iconbtn","aria-label":"Settings",onclick:function(){ openSheet({type:"settings"}); }}, svg(ICONS.cog,{w:1.8}))
    )
  );
}
function renderNav(){
  var nav = document.getElementById("nav");
  nav.innerHTML = "";
  var items = [
    ["today","Today",ICONS.today],
    ["food","Food",ICONS.food],
    ["train","Train",ICONS.train],
    ["weeks","Weeks",ICONS.weeks],
    ["progress","Progress",ICONS.chart]
  ];
  var wrap = h("div",{class:"nav-in"});
  items.forEach(function(it){
    var b = h("button",{ onclick:function(){ go(it[0]); } }, svg(it[2],{size:20,w:2}), it[1]);
    if(V.tab === it[0]) b.setAttribute("aria-current","page");
    wrap.appendChild(b);
  });
  nav.appendChild(wrap);
}
function checkbox(on){
  var b = h("span",{class:"box"+(on?" on":"")});
  var s = svg(ICONS.check,{size:14,w:3.4});
  s.setAttribute("stroke", on ? "var(--onred)" : "transparent");
  b.appendChild(s);
  return b;
}
function barEl(frac, markFrac){
  var b = h("div",{class:"bar"}, h("i",{style:"width:"+clamp(frac*100,0,100)+"%"}));
  if(markFrac != null) b.appendChild(h("u",{style:"left:"+clamp(markFrac*100,0,100)+"%"}));
  return b;
}

/* =========================================================================
   7. TODAY
   ========================================================================= */
function dayStrip(){
  var w = weekOf(V.date) || S.plan.weeks[0];
  var strip = h("div",{class:"strip",role:"group","aria-label":"Days this week"});
  w.days.forEach(function(dp){
    var d = parseISO(dp.date), wk = workout(dp.wid);
    var st = dp.wid === "rest" ? "" : sessionStatus(dp.date, dp.wid);
    var has = dp.wid && dp.wid !== "rest";
    var b = h("button",{ "aria-pressed": dp.date===V.date ? "true":"false",
        onclick:function(){ V.date = dp.date; render(); } },
      h("span",{class:"d",text:DOW[d.getDay()].toUpperCase()}),
      h("span",{class:"n",text:String(d.getDate())}),
      h("span",{class:"tag"+(st === "done" ? " done" : (st === "missed" ? " miss" : (has?" has":"")))})
    );
    if(dp.date === todayISO()) b.className = "today";
    strip.appendChild(b);
  });
  return strip;
}
function heroFuel(){
  var t = dayTotals(V.date), s = S.plan.settings;
  var left = s.kcalMin - t.kcal;
  var hero = h("section",{class:"hero"});
  var main = h("div",{class:"hero-main"});
  main.appendChild(h("div",{class:"eyebrow",text:"Eaten today"}));
  main.appendChild(h("div",{},
    h("span",{class:"bignum",text:n0(t.kcal).toLocaleString()}),
    h("span",{class:"bigunit",text:"kcal"})
  ));
  main.appendChild(h("div",{class:"small muted",style:"margin:2px 0 10px",
    text: left > 0 ? n0(left).toLocaleString()+" to reach "+s.kcalMin.toLocaleString()+", range up to "+s.kcalMax.toLocaleString()
        : (t.kcal > s.kcalMax ? n0(t.kcal-s.kcalMax).toLocaleString()+" over the top of your range" : "Inside your "+s.kcalMin.toLocaleString()+"-"+s.kcalMax.toLocaleString()+" range") }));
  main.appendChild(barEl(t.kcal/s.kcalMax, s.kcalMin/s.kcalMax));
  hero.appendChild(main);

  var grid = h("div",{class:"metergrid"});
  var pcell = h("div",{class:"metercell"},
    h("div",{class:"v num",text:n0(t.p)+"g"}),
    h("div",{class:"l",text:"Protein — target "+S.plan.settings.proMin+"-"+S.plan.settings.proMax+"g"}),
    h("div",{style:"margin-top:6px"}, barEl(t.p/s.proMax, s.proMin/s.proMax))
  );
  var d = day(V.date);
  var scell = h("div",{class:"metercell"},
    h("div",{class:"v num",text: d.steps ? n0(d.steps).toLocaleString() : "—"}),
    h("div",{class:"l",text:"Steps — aim "+s.steps.toLocaleString()+"+"}),
    h("div",{style:"margin-top:6px"}, barEl((d.steps||0)/s.steps))
  );
  grid.appendChild(pcell); grid.appendChild(scell);
  hero.appendChild(grid);

  var grid2 = h("div",{class:"metergrid"});
  grid2.appendChild(h("div",{class:"metercell"},
    h("div",{class:"v num",text:n0(t.cb)+"g"}), h("div",{class:"l",text:"Carbohydrate"})));
  grid2.appendChild(h("div",{class:"metercell"},
    h("div",{class:"v num",text:n0(t.f)+"g"}), h("div",{class:"l",text:"Fat"})));
  hero.appendChild(grid2);
  return hero;
}
function sessionCard(){
  var dp = dayPlan(V.date);
  if(!dp) return h("div",{class:"card"},
    h("div",{class:"small muted",text:"This date is not in a week yet."}),
    h("button",{class:"btn sm red",style:"margin-top:8px",onclick:function(){ go("weeks"); }},"Add a week"));
  var wk = workout(dp.wid) || BASE_WORKOUTS.rest;
  var status = sessionStatus(V.date, dp.wid);
  var done = status === "done", missed = status === "missed";
  var card = h("section",{class:"card",style:"padding:0;overflow:hidden"});
  card.appendChild(h("div",{class:"band"}, "Today's session", h("span",{class:"spacer"}),
    h("span",{text: dp.when || (wk.kind==="rest" ? "Recovery" : "")})));
  var inner = h("div",{style:"padding:13px 14px"});
  inner.appendChild(h("div",{class:"row",style:"align-items:flex-start;gap:12px"},
    h("div",{class:"grow"},
      h("div",{style:"font-family:var(--display);font-size:22px;line-height:1.05;text-transform:uppercase",
        class: done ? "strike":"", text: dp.label || wk.name}),
      dp.target ? h("div",{class:"small muted",text:"Target "+dp.target}) : null,
      dp.sport ? h("div",{class:"small",text:"Sport: "+dp.sport}) : null,
      dp.note ? h("div",{class:"small muted",style:"margin-top:4px",text:dp.note}) : null
    ),
    status ? h("span",{class:"stat "+status,text: done ? "DONE" : "NOT DONE"}) : null
  ));
  if(wk.kind !== "rest"){
    var actions = h("div",{class:"row wrap",style:"margin-top:12px"});
    actions.appendChild(h("button",{class:"btn red sm",onclick:function(){
      openSheet({type:"session", date:V.date, wid:dp.wid});
    }}, wk.ex.length ? (done ? "Review log" : "Start workout") : (done ? "Review" : "Log it")));
    actions.appendChild(h("button",{class:"btn sm"+(done?" solid":""),onclick:function(){
      var st = setSessionStatus(V.date, dp.wid, "done");
      toast(st === "done" ? "Session marked done" : "No longer marked done");
      render();
    }}, done ? "Done" : "Mark done"));
    actions.appendChild(h("button",{class:"btn sm"+(missed?" warn":""),onclick:function(){
      var st = setSessionStatus(V.date, dp.wid, "missed");
      toast(st === "missed" ? "Logged as not done" : "Cleared");
      render();
    }}, missed ? "Not done" : "Didn't do it"));
    if(wk.kind === "strength")
      actions.appendChild(h("button",{class:"btn ghost sm",onclick:function(){
        openSheet({type:"session", date:V.date, wid:"circuit"});
      }},"Use 20-min circuit"));
    inner.appendChild(actions);
    if(missed) inner.appendChild(missReasonPicker(V.date, dp.wid));
  } else {
    inner.appendChild(h("div",{class:"small muted",style:"margin-top:8px",
      text:"No formal workout. Shop, prep two meals and run your Sunday check-in."}));
    inner.appendChild(h("button",{class:"btn sm red",style:"margin-top:10px",onclick:function(){
      var w = weekOf(V.date); if(w) openSheet({type:"checkin", weekId:w.id});
    }},"Open Sunday check-in"));
  }
  card.appendChild(inner);
  return card;
}
/* Why it didn't happen. Optional — the mark stands on its own — but the
   pattern across weeks is what actually tells you what to change. */
function missReasonPicker(date, wid){
  var sess = ensureSession(date, wid);
  var box = h("div",{class:"missbox"});
  box.appendChild(h("div",{class:"xs muted",style:"margin-bottom:6px",
    text:"What got in the way? Optional, and it shows up on Progress."}));
  var row = h("div",{class:"row wrap",style:"gap:6px"});
  MISS_REASONS.forEach(function(r){
    row.appendChild(h("button",{class:"chip","aria-pressed": sess.missReason === r ? "true":"false",
      onclick:function(){
        sess.missReason = sess.missReason === r ? "" : r;
        touchDay(date); render();
      }, text:r}));
  });
  box.appendChild(row);
  box.appendChild(h("input",{class:"in",style:"margin-top:8px","data-fk":"miss-"+date+"-"+wid,
    placeholder:"Or write your own", value: MISS_REASONS.indexOf(sess.missReason) < 0 ? (sess.missReason||"") : "",
    oninput:function(e){ sess.missReason = e.target.value; },
    onchange:function(){ touchDay(date); render(); }}));
  return box;
}
function mealTimetable(){
  var card = h("section",{class:"card",style:"padding:0;overflow:hidden"});
  card.appendChild(h("div",{class:"band"},"Eating rhythm", h("span",{class:"spacer"}),
    h("span",{text:"3 meals + 1 planned snack"})));
  var inner = h("div",{style:"padding:4px 14px 13px"});
  var d = day(V.date);
  MEALS.forEach(function(m){
    var t = mealTotals(V.date, m.key);
    var eaten = !!d.meals[m.key];
    var row = h("div",{class:"listrow"});
    row.appendChild(h("button",{class:"box"+(eaten?" on":""),"aria-label":"Mark "+m.name+" eaten",
      style:"cursor:pointer;background:"+(eaten?"var(--red)":"transparent"),
      onclick:function(){ d.meals[m.key] = !d.meals[m.key]; touchDay(V.date); render(); }},
      (function(){ var s=svg(ICONS.check,{size:14,w:3.4}); s.setAttribute("stroke", eaten?"var(--onred)":"transparent"); return s; })()
    ));
    var mid = h("div",{class:"grow"},
      h("div",{class:"row"},
        h("div",{class:"grow"}, h("strong",{text:m.name}),
          h("span",{class:"xs muted",style:"margin-left:7px",text:m.time})),
        h("div",{class:"xs num muted",text: t.kcal ? n0(t.kcal)+" kcal · "+n0(t.p)+"g P" : "nothing logged"})
      ),
      h("div",{class:"xs muted",text:m.goal}),
      h("div",{class:"xs",style:"color:var(--red);margin-top:2px",
        text:"Reminder "+(S.plan.settings.mealTimes[m.key]||"—")})
    );
    row.appendChild(mid);
    row.appendChild(h("button",{class:"btn sm ghost","aria-label":"Add food to "+m.name,
      onclick:function(){ V.mealFilter = m.key; openSheet({type:"addFood", date:V.date, meal:m.key}); }},"Add"));
    inner.appendChild(row);
  });
  inner.appendChild(h("div",{class:"xs muted",style:"margin-top:10px",
    text:"Anti-grazing rule: decide the four eating periods in advance. If you are hungry between them, check fluids first, then whether the last meal had enough protein, fibre and volume."}));
  card.appendChild(inner);
  return card;
}
function quickLog(){
  var picks = ["m1","m2","m3","s1","s3","r1"];
  var wrap = h("section",{class:"card"});
  wrap.appendChild(h("div",{class:"eyebrow",text:"Quick log"}));
  var row = h("div",{class:"row wrap",style:"gap:6px"});
  picks.forEach(function(id){
    var fd = food(id); if(!fd) return;
    row.appendChild(h("button",{class:"chip",onclick:function(){
      var meal = guessMeal();
      addEntry(V.date, meal, fd, fd.q);
      toast(fd.n.split("—")[0].trim()+" added to "+meal);
      render();
    }, text: fd.n.replace("Meal Prep A — ","A: ").replace("Meal Prep B — ","B: ").replace("Rescue 1 — ","Rescue: ")}));
  });
  row.appendChild(h("button",{class:"chip ghost",onclick:function(){
    openSheet({type:"addFood", date:V.date, meal:guessMeal()});
  }},"Search all food"));
  wrap.appendChild(row);
  return wrap;
}
function guessMeal(){
  var hr = new Date().getHours();
  if(V.date !== todayISO()) return "lunch";
  if(hr < 11) return "breakfast";
  if(hr < 15) return "lunch";
  if(hr < 17.5) return "snack";
  return "dinner";
}
function bodyCard(){
  var d = day(V.date);
  var card = h("section",{class:"card"});
  card.appendChild(h("div",{class:"eyebrow",text:"Body and movement"}));
  card.appendChild(h("div",{class:"fields three"},
    numField("Weight (kg)", d.weight, "w-"+V.date, function(v){ d.weight = v; touchDay(V.date); }),
    numField("Waist (cm)", d.waist, "wa-"+V.date, function(v){ d.waist = v; touchDay(V.date); }),
    numField("Steps", d.steps, "st-"+V.date, function(v){ d.steps = v; touchDay(V.date); paintTotalsSoft(); })
  ));
  card.appendChild(h("div",{class:"xs muted",style:"margin-top:8px",
    text:"Weight moves day to day. Judge it on the weekly average on the Progress tab, not on one morning."}));
  return card;
}
/* Everything already logged on this date, in one place, all of it tappable.
   Getting a number wrong is normal; hunting for where you put it is not. */
function dayLogCard(){
  var d = day(V.date), dp = dayPlan(V.date);
  var card = h("section",{class:"card",style:"padding:0;overflow:hidden"});
  card.appendChild(h("div",{class:"band"},"Logged on this day", h("span",{class:"spacer"}),
    h("span",{text:"Tap anything to fix it"})));
  var inner = h("div",{style:"padding:4px 14px 12px"});
  var any = false;

  MEALS.forEach(function(m){
    var list = d.food.filter(function(e){ return e.meal === m.key; });
    if(!list.length) return;
    any = true;
    inner.appendChild(h("div",{class:"eyebrow",style:"margin:10px 0 0",text:m.name}));
    list.forEach(function(e){
      inner.appendChild(h("button",{class:"check",style:"align-items:center",
        onclick:function(){ openSheet({type:"editEntry", date:V.date, entryId:e.id}); }},
        h("div",{class:"grow"},
          h("div",{text:e.name}),
          h("div",{class:"xs muted",text:unitLabel(e.unit, e.qty)+"  ·  "+n0(e.kcal)+" kcal  ·  "+n1(e.p)+"g protein"})),
        h("span",{class:"link",text:"Edit"})
      ));
    });
  });

  var wids = Object.keys(d.sessions).filter(function(wid){
    var s = d.sessions[wid];
    return s.done || s.status === "missed" || s.note
        || (s.log && Object.keys(s.log).length) || s.dist || s.dur;
  });
  if(wids.length){
    any = true;
    inner.appendChild(h("div",{class:"eyebrow",style:"margin:12px 0 0",text:"Training"}));
    wids.forEach(function(wid){
      var wk = workout(wid), st = sessionStatus(V.date, wid);
      var sess = d.sessions[wid];
      inner.appendChild(h("button",{class:"check",style:"align-items:center",
        onclick:function(){ openSheet({type:"session", date:V.date, wid:wid}); }},
        h("div",{class:"grow"},
          h("div",{text: wk ? wk.name : wid}),
          h("div",{class:"xs muted",text: st === "done" ? "Marked done"
            : (st === "missed" ? ("Not done" + (sess.missReason ? " — "+sess.missReason : ""))
                               : "Logged, not marked either way")})),
        st ? h("span",{class:"stat "+st,text: st === "done" ? "DONE" : "NOT DONE"})
           : h("span",{class:"link",text:"Open"})
      ));
    });
  } else if(dp && dp.wid !== "rest"){
    inner.appendChild(h("div",{class:"eyebrow",style:"margin:12px 0 0",text:"Training"}));
    inner.appendChild(h("div",{class:"small muted",style:"padding:6px 0",
      text:"Nothing recorded for "+(dp.label || "this session")+" yet."}));
  }

  if(d.weight != null || d.waist != null || d.steps != null){
    any = true;
    inner.appendChild(h("div",{class:"eyebrow",style:"margin:12px 0 0",text:"Body and movement"}));
    inner.appendChild(h("div",{class:"small muted",style:"padding:4px 0",
      text:[ d.weight != null ? n1(d.weight)+" kg" : null,
             d.waist != null ? n1(d.waist)+" cm waist" : null,
             d.steps != null ? n0(d.steps).toLocaleString()+" steps" : null
           ].filter(Boolean).join("  ·  ")+"  — change them in the fields below."}));
  }

  if(!any)
    inner.appendChild(h("div",{class:"small muted",style:"padding:10px 0",
      text:"Nothing logged on this day yet. Whatever you add shows up here, and every line of it can be edited or deleted afterwards."}));

  if(d.food.length)
    inner.appendChild(h("button",{class:"btn sm ghost block",style:"margin-top:12px",onclick:function(){
      openSheet({type:"clearDay", date:V.date});
    }},"Clear the food log for this day"));

  card.appendChild(inner);
  return card;
}
function paintTotalsSoft(){ /* values commit on blur; the hero refreshes on next render */ }
function numField(label, val, fk, onSet){
  var inp = h("input",{class:"in num",type:"number",inputmode:"decimal","data-fk":fk,
    value: val == null ? "" : String(val), placeholder:"—",
    onchange:function(e){
      var v = e.target.value === "" ? null : parseFloat(e.target.value);
      onSet(isNaN(v) ? null : v); render();
    }});
  return h("div",{}, h("label",{class:"f",text:label}), inp);
}
function weekBits(){
  var w = weekOf(V.date);
  if(!w) return null;
  var card = h("section",{class:"card"});
  card.appendChild(h("div",{class:"eyebrow",text:"Week "+w.num+" rules"}));
  var row = h("div",{class:"row wrap",style:"gap:8px;align-items:center"});
  row.appendChild(h("div",{class:"small",text:"Takeaways used"}));
  row.appendChild(h("div",{class:"row",style:"gap:4px"},
    h("button",{class:"btn sm",onclick:function(){ w.takeaways = Math.max(0,(w.takeaways||0)-1); touchPlan(); render(); }},"−"),
    h("div",{class:"num",style:"min-width:2.2em;text-align:center;font-family:var(--display);font-size:22px",
      text:String(w.takeaways||0)}),
    h("button",{class:"btn sm",onclick:function(){ w.takeaways = (w.takeaways||0)+1; touchPlan(); render(); }},"+")
  ));
  row.appendChild(h("div",{class:"xs",style:"color:"+((w.takeaways||0)>1?"var(--red)":"var(--ink2)"),
    text:(w.takeaways||0)>1 ? "Over the one planned meal" : "Allowance: 1 planned meal"}));
  card.appendChild(row);
  var mp = h("button",{class:"check",style:"margin-top:8px",onclick:function(){
    w.mealPrepDone = !w.mealPrepDone; touchPlan(); render(); }},
    checkbox(w.mealPrepDone),
    h("div",{}, h("strong",{text:"Two repeatable meals prepped"}),
      h("div",{class:"xs muted",text:"Cajun chicken rice bowls and turkey/beef chilli bowls, or your swap for the week"})));
  card.appendChild(mp);
  return card;
}
function screenToday(){
  var wrap = h("div",{});
  var w = weekOf(V.date);
  wrap.appendChild(h("div",{class:"eyebrow",style:"margin-top:14px",
    text: (w ? "Week "+w.num+" · " : "") + fmtDate(V.date) + (V.date===todayISO() ? " · today" : "")}));
  wrap.appendChild(h("h1",{class:"h1",text: DOW[parseISO(V.date).getDay()]==="Sun" ? "Sunday" :
    ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"][parseISO(V.date).getDay()]}));
  wrap.appendChild(dayStrip());
  wrap.appendChild(sessionCard());
  wrap.appendChild(heroFuel());
  wrap.appendChild(quickLog());
  wrap.appendChild(mealTimetable());
  wrap.appendChild(dayLogCard());
  wrap.appendChild(bodyCard());
  wrap.appendChild(weekBits());
  return wrap;
}
/* =========================================================================
   8. FOOD ENTRIES
   ========================================================================= */
function factorFor(fd, qty){ return fd.u === "g" ? (qty/100) : qty; }
function macrosFor(fd, qty){
  var k = factorFor(fd, qty);
  return { kcal: Math.round(fd.kcal*k), p: Math.round(fd.p*k*10)/10,
           cb: Math.round(fd.cb*k*10)/10, f: Math.round(fd.f*k*10)/10 };
}
function addEntry(date, meal, fd, qty){
  var m = macrosFor(fd, qty), d = day(date);
  d.food.push({ id:uid(), meal:meal, foodId:fd.id, name:fd.n, qty:qty, unit:fd.u,
                kcal:m.kcal, p:m.p, cb:m.cb, f:m.f, at:now() });
  touchDay(date);
}
function addCustomEntry(date, meal, e){
  var d = day(date);
  d.food.push({ id:uid(), meal:meal, foodId:null, name:e.name, qty:e.qty, unit:e.unit,
                kcal:e.kcal, p:e.p, cb:e.cb, f:e.f, at:now() });
  touchDay(date);
}
function removeEntry(date, entryId){
  var d = day(date), removed = null, at = -1, i;
  for(i=0;i<d.food.length;i++) if(d.food[i].id === entryId){ removed = d.food[i]; at = i; }
  if(!removed) return null;
  d.food.splice(at, 1);
  touchDay(date);
  return {entry:removed, at:at};
}
function restoreEntry(date, undo){
  if(!undo) return;
  var d = day(date);
  d.food.splice(Math.min(undo.at, d.food.length), 0, undo.entry);
  touchDay(date);
}
function findEntry(date, entryId){
  var list = (S.days[date]||{}).food || [], i;
  for(i=0;i<list.length;i++) if(list[i].id === entryId) return list[i];
  return null;
}
function recentFoods(){
  var seen = {}, out = [], i, k, dates = Object.keys(S.days).sort().reverse().slice(0,21);
  for(i=0;i<dates.length;i++){
    var list = S.days[dates[i]].food || [];
    for(k=0;k<list.length;k++){
      var e = list[k];
      if(!e.foodId || seen[e.foodId]) continue;
      var fd = food(e.foodId); if(!fd) continue;
      seen[e.foodId] = 1; out.push({fd:fd, qty:e.qty});
      if(out.length >= 8) return out;
    }
  }
  return out;
}
function unitLabel(u, q){
  if(u === "g") return q+"g";
  if(u === "slice") return q+(q===1?" slice":" slices");
  if(u === "wrap") return q+(q===1?" wrap":" wraps");
  return q === 1 ? "1 portion" : q+" portions";
}

/* =========================================================================
   9. FOOD SCREEN
   ========================================================================= */
function screenFood(){
  var wrap = h("div",{}), t = dayTotals(V.date), s = S.plan.settings, d = day(V.date);
  wrap.appendChild(h("div",{class:"eyebrow",style:"margin-top:14px",text:fmtDate(V.date)}));
  wrap.appendChild(h("h1",{class:"h1",text:"Food diary"}));
  wrap.appendChild(h("p",{class:"sub",text:"Protein + carbohydrate + vegetables/fruit + a small amount of sauce or fat."}));
  wrap.appendChild(dayStrip());

  var sum = h("section",{class:"card",style:"padding:0;overflow:hidden"});
  sum.appendChild(h("div",{class:"band"},"Day total", h("span",{class:"spacer"}),
    h("span",{class:"num",text: n0(t.kcal).toLocaleString()+" / "+s.kcalMin.toLocaleString()+"-"+s.kcalMax.toLocaleString()+" kcal"})));
  var g = h("div",{class:"metergrid"});
  [["Protein",n0(t.p)+"g",s.proMin+"-"+s.proMax+"g"],["Carbs",n0(t.cb)+"g",""],
   ["Fat",n0(t.f)+"g",""],["Entries",String(d.food.length),""]].forEach(function(c){
    g.appendChild(h("div",{class:"metercell"}, h("div",{class:"v num",text:c[1]}),
      h("div",{class:"l",text:c[2] ? c[0]+" — target "+c[2] : c[0]})));
  });
  sum.appendChild(g);
  wrap.appendChild(sum);

  MEALS.forEach(function(m){
    var list = d.food.filter(function(e){ return e.meal === m.key; });
    var mt = entryTotals(list);
    var card = h("section",{class:"card",style:"padding:0;overflow:hidden"});
    card.appendChild(h("div",{class:"band"}, m.name,
      h("span",{class:"spacer"}), h("span",{class:"num",text:m.time+"  ·  "+n0(mt.kcal)+" kcal"})));
    var inner = h("div",{style:"padding:4px 14px 12px"});
    if(!list.length){
      inner.appendChild(h("div",{class:"small muted",style:"padding:9px 0",
        text: m.key === "snack" ? "One planned snack: protein plus fruit." : "Nothing logged yet."}));
    }
    list.forEach(function(e){
      inner.appendChild(h("button",{class:"check",style:"align-items:center",
        onclick:function(){ openSheet({type:"editEntry", date:V.date, entryId:e.id}); }},
        h("div",{class:"grow"},
          h("div",{text:e.name}),
          h("div",{class:"xs muted",text:unitLabel(e.unit, e.qty)+"  ·  "+n0(e.p)+"g protein  ·  "+n0(e.cb)+"g carbs  ·  "+n0(e.f)+"g fat"})),
        h("div",{class:"num",style:"font-family:var(--display);font-size:19px",text:n0(e.kcal)})
      ));
    });
    inner.appendChild(h("button",{class:"btn sm red block",style:"margin-top:10px",
      onclick:function(){ openSheet({type:"addFood", date:V.date, meal:m.key}); }},"Add to "+m.name.toLowerCase()));
    card.appendChild(inner);
    wrap.appendChild(card);
  });

  wrap.appendChild(h("section",{class:"card"},
    h("div",{class:"eyebrow",text:"Portion starting points"}),
    h("div",{class:"small",text:"Lunch and dinner: 150-200g raw lean meat or fish, 60-90g dry rice or pasta or 250-350g potatoes, plus 150-250g vegetables."})
  ));
  return wrap;
}

/* =========================================================================
   10. ADD / EDIT FOOD SHEETS
   ========================================================================= */
function sheetShell(title, bodyNodes, sub){
  var scrim = h("div",{class:"scrim",onclick:function(e){ if(e.target === scrim) closeSheet(); }});
  var sheet = h("div",{class:"sheet",role:"dialog","aria-modal":"true"});
  sheet.appendChild(h("div",{class:"sheet-head"},
    h("div",{class:"grow"}, h("div",{class:"sheet-title",text:title}),
      sub ? h("div",{class:"xs muted",text:sub}) : null),
    h("button",{class:"iconbtn","aria-label":"Close",onclick:closeSheet}, svg(ICONS.x,{w:2}))
  ));
  addKid(sheet, bodyNodes);
  scrim.appendChild(sheet);
  return scrim;
}
function buildSheet(s){
  if(s.type === "addFood")   return sheetAddFood(s);
  if(s.type === "foodDetail")return sheetFoodDetail(s);
  if(s.type === "editEntry") return sheetEditEntry(s);
  if(s.type === "clearDay")  return sheetClearDay(s);
  if(s.type === "manual")    return sheetManual(s);
  if(s.type === "session")   return sheetSession(s);
  if(s.type === "editDay")   return sheetEditDay(s);
  if(s.type === "addWeek")   return sheetAddWeek(s);
  if(s.type === "editWorkout") return sheetEditWorkout(s);
  if(s.type === "checkin")   return sheetCheckin(s);
  if(s.type === "settings")  return sheetSettings(s);
  return sheetShell("", []);
}
function mealChips(current, onPick){
  var row = h("div",{class:"row wrap",style:"gap:6px;margin-bottom:12px"});
  MEALS.forEach(function(m){
    var b = h("button",{class:"chip","aria-pressed": m.key===current ? "true":"false",
      onclick:function(){ onPick(m.key); }, text:m.name});
    row.appendChild(b);
  });
  return row;
}
function sheetAddFood(s){
  var body = [];
  body.push(mealChips(s.meal, function(k){ V.sheet.meal = k; render(); }));
  body.push(h("input",{class:"in",type:"search","data-fk":"foodsearch",placeholder:"Search food",
    value:V.search, oninput:function(e){ V.search = e.target.value; render(); }}));

  var q = V.search.trim().toLowerCase();
  if(!q){
    var rec = recentFoods();
    if(rec.length){
      body.push(h("div",{class:"h2",text:"Recent"}));
      var rw = h("div",{class:"row wrap",style:"gap:6px"});
      rec.forEach(function(r){
        rw.appendChild(h("button",{class:"chip",onclick:function(){
          addEntry(s.date, s.meal, r.fd, r.qty);
          toast("Added to "+s.meal); closeSheet();
        }, text:r.fd.n.split("—")[0].trim()+" · "+unitLabel(r.fd.u, r.qty)}));
      });
      body.push(rw);
    }
  }
  var cats = ["My meals","Snacks","Rescue","Protein","Carbs","Veg & fruit","Flavour","My foods"];
  var list = allFoods().filter(function(f){
    if(!q) return true;
    return f.n.toLowerCase().indexOf(q) >= 0 || (f.d||"").toLowerCase().indexOf(q) >= 0;
  });
  cats.forEach(function(cat){
    var items = list.filter(function(f){ return f.c === cat; });
    if(!items.length) return;
    body.push(h("div",{class:"h2",text:cat}));
    var box = h("div",{class:"card",style:"padding:2px 12px;margin:6px 0"});
    items.forEach(function(fd){
      box.appendChild(h("button",{class:"check",style:"align-items:center",onclick:function(){
        openSheet({type:"foodDetail", date:s.date, meal:s.meal, foodId:fd.id, qty:fd.q});
      }},
        h("div",{class:"grow"}, h("div",{text:fd.n}),
          h("div",{class:"xs muted",text: fd.d ? fd.d : (fd.u === "g"
              ? n0(fd.kcal)+" kcal · "+n1(fd.p)+"g protein per 100g"
              : n0(fd.kcal)+" kcal · "+n1(fd.p)+"g protein per "+(fd.u === "portion" ? "portion" : fd.u))}),
          fd.d ? h("div",{class:"xs muted",text:n0(fd.kcal)+" kcal · "+n1(fd.p)+"g protein per portion"}) : null),
        svg(ICONS.plus,{size:16,w:2.6})
      ));
    });
    body.push(box);
  });
  if(!list.length) body.push(h("div",{class:"card small muted",text:"Nothing matches that. Enter it manually below and it is saved for next time."}));

  body.push(h("div",{class:"rule"}));
  body.push(h("button",{class:"btn block red",style:"margin-top:14px",onclick:function(){
    openSheet({type:"manual", date:s.date, meal:s.meal}); }},"Enter food manually"));
  body.push(h("div",{class:"card",style:"margin-top:10px"},
    h("div",{class:"row",style:"gap:10px;align-items:flex-start"},
      h("div",{class:"grow"},
        h("strong",{text:"Barcode scanning"}),
        h("div",{class:"xs muted",text:"Not available on the web version: this page cannot reach the camera or an outside food database. It arrives with the phone app build, using Open Food Facts."}))
    )));
  return sheetShell("Add food", body, MEALS.filter(function(m){return m.key===s.meal;})[0].name+" · "+fmtShort(s.date));
}
function sheetFoodDetail(s){
  var fd = food(s.foodId);
  if(!fd) return sheetShell("Food", [h("div",{class:"small",text:"That food is gone."})]);
  var qty = s.qty != null ? s.qty : fd.q;
  var kcalEl = h("div",{class:"bignum",style:"font-size:56px",text:"0"});
  var macroEl = h("div",{class:"small muted"});
  var bar = h("div",{});

  function refresh(){
    var m = macrosFor(fd, qty);
    kcalEl.textContent = n0(m.kcal).toLocaleString();
    macroEl.textContent = n1(m.p)+"g protein · "+n1(m.cb)+"g carbs · "+n1(m.f)+"g fat";
    bar.innerHTML = "";
    bar.appendChild(barEl(m.kcal / S.plan.settings.kcalMax));
  }
  var input = h("input",{class:"in num",type:"number",inputmode:"decimal","data-fk":"qty",
    value:String(qty), oninput:function(e){
      var v = parseFloat(e.target.value); qty = isNaN(v) ? 0 : v; s.qty = qty; refresh();
    }});
  var body = [];
  body.push(h("div",{class:"card"},
    h("div",{style:"font-weight:600",text:fd.n}),
    fd.d ? h("div",{class:"xs muted",style:"margin-top:2px",text:fd.d}) : null,
    h("div",{class:"xs muted",style:"margin-top:6px",
      text:"Reference values: "+n0(fd.kcal)+" kcal, "+n1(fd.p)+"g protein, "+n1(fd.cb)+"g carbs, "+n1(fd.f)+"g fat per "+(fd.u==="g"?"100g":fd.u)+". Edit them in Settings if your pack differs."})
  ));
  body.push(h("div",{class:"fields two"},
    h("div",{}, h("label",{class:"f",text: fd.u === "g" ? "Amount (grams)" : "How many "+(fd.u==="portion"?"portions":fd.u+"s")}), input),
    h("div",{}, h("label",{class:"f",text:"Quick pick"}),
      h("div",{class:"row",style:"gap:5px"},
        (fd.u === "g" ? [50,100,150,200] : [0.5,1,1.5,2]).map(function(v){
          return h("button",{class:"chip",onclick:function(){ qty = v; s.qty = v; input.value = String(v); refresh(); }, text:String(v)});
        })
      ))
  ));
  body.push(h("div",{class:"card",style:"text-align:left"}, kcalEl,
    h("div",{class:"xs muted",style:"margin:-4px 0 6px",text:"kcal"}), macroEl,
    h("div",{style:"margin-top:8px"}, bar)));
  body.push(h("button",{class:"btn block red",onclick:function(){
    if(!(qty > 0)){ toast("Put in an amount first."); return; }
    addEntry(s.date, s.meal, fd, qty);
    toast("Added to "+s.meal); closeSheet();
  }},"Add to "+s.meal));
  refresh();
  return sheetShell(fd.n.split("—")[0].trim(), body, fmtShort(s.date));
}
function sheetEditEntry(s){
  var e = findEntry(s.date, s.entryId);
  if(!e) return sheetShell("Entry", [h("div",{class:"small",text:"That entry is gone."})]);
  if(!s.draft) s.draft = {name:e.name, qty:e.qty, unit:e.unit, kcal:e.kcal, p:e.p, cb:e.cb, f:e.f, meal:e.meal};
  var draft = s.draft;
  var src = e.foodId ? food(e.foodId) : null;
  var body = [];
  body.push(h("div",{class:"xs muted",style:"margin-bottom:8px",
    text:"Change anything here — the meal it belongs to, the amount or the numbers themselves. Nothing is locked once it is logged."}));
  body.push(mealChips(draft.meal, function(k){ draft.meal = k; render(); }));
  body.push(h("div",{class:"fields two"},
    fld("Name", draft.name, "en-name", function(v){ draft.name = v; }, "text"),
    fld("Amount"+(draft.unit === "g" ? " (g)" : ""), draft.qty, "en-qty", function(v){ draft.qty = parseFloat(v)||0; })
  ));
  if(src)
    body.push(h("button",{class:"btn sm block",style:"margin-top:8px",onclick:function(){
      if(!(draft.qty > 0)){ toast("Put in an amount first."); return; }
      var m = macrosFor(src, draft.qty);
      draft.kcal = m.kcal; draft.p = m.p; draft.cb = m.cb; draft.f = m.f;
      toast("Recalculated for "+unitLabel(draft.unit, draft.qty));
      render();
    }},"Recalculate the numbers from the amount"));
  body.push(h("div",{class:"fields two",style:"margin-top:10px"},
    fld("Calories", draft.kcal, "en-kcal", function(v){ draft.kcal = parseFloat(v)||0; }),
    fld("Protein (g)", draft.p, "en-p", function(v){ draft.p = parseFloat(v)||0; })
  ));
  body.push(h("div",{class:"fields two",style:"margin-top:10px"},
    fld("Carbs (g)", draft.cb, "en-cb", function(v){ draft.cb = parseFloat(v)||0; }),
    fld("Fat (g)", draft.f, "en-f", function(v){ draft.f = parseFloat(v)||0; })
  ));
  body.push(h("div",{class:"card xs muted",style:"margin-top:10px"},
    h("div",{}, h("strong",{text:"Logged "}),
      new Date(e.at || now()).toLocaleString(), " · ", n0(e.kcal)+" kcal as it stands"),
    h("div",{style:"margin-top:2px",
      text: src ? "Reference: "+n0(src.kcal)+" kcal per "+(src.u === "g" ? "100g" : src.u)+"."
                : "Entered by hand, so there is nothing to recalculate from."})));
  body.push(h("div",{class:"row",style:"gap:8px;margin-top:14px"},
    h("button",{class:"btn red grow",onclick:function(){
      if(!draft.name.trim()){ toast("Give it a name."); return; }
      e.name = draft.name.trim(); e.qty = draft.qty; e.kcal = draft.kcal;
      e.p = draft.p; e.cb = draft.cb; e.f = draft.f; e.meal = draft.meal;
      touchDay(s.date); toast("Entry updated"); closeSheet();
    }},"Save changes"),
    h("button",{class:"btn ghost",onclick:function(){
      var undo = removeEntry(s.date, s.entryId);
      closeSheet();
      toast("Entry deleted", "Undo", function(){ restoreEntry(s.date, undo); render(); });
    }},"Delete")
  ));
  return sheetShell("Edit entry", body, fmtShort(s.date));
}
/* For the day you logged someone else's dinner, or logged the same meal twice
   over. One button, one undo, no going through six entries. */
function sheetClearDay(s){
  var d = day(s.date), t = dayTotals(s.date);
  var body = [];
  body.push(h("div",{class:"card small"},
    h("div",{}, h("strong",{text:d.food.length+" food "+(d.food.length===1?"entry":"entries")+" on "+fmtDate(s.date)})),
    h("div",{class:"xs muted",style:"margin-top:4px",
      text:n0(t.kcal).toLocaleString()+" kcal and "+n0(t.p)+"g protein would be removed. Your training, weight, waist and steps for the day stay exactly as they are."})));
  body.push(h("button",{class:"btn block red",style:"margin-top:14px",onclick:function(){
    var backup = deep(d.food);
    d.food = [];
    touchDay(s.date);
    closeSheet();
    toast("Food log cleared", "Undo", function(){
      day(s.date).food = backup; touchDay(s.date); render();
    });
  }},"Clear the food log"));
  body.push(h("button",{class:"btn block ghost",style:"margin-top:8px",onclick:closeSheet},"Keep it"));
  return sheetShell("Clear this day's food", body, fmtShort(s.date));
}
function fld(label, val, fk, onSet, type){
  return h("div",{}, h("label",{class:"f",text:label}),
    h("input",{class:"in"+(type==="text"?"":" num"), type: type || "number",
      inputmode: type === "text" ? null : "decimal", "data-fk":fk,
      value: val == null ? "" : String(val),
      oninput:function(e){ onSet(e.target.value); }}));
}
function sheetManual(s){
  if(!s.draft) s.draft = {name:"", qty:1, unit:"portion", kcal:"", p:"", cb:"", f:"", save:true};
  var d = s.draft;
  var body = [];
  body.push(mealChips(s.meal, function(k){ V.sheet.meal = k; render(); }));
  body.push(fld("What was it", d.name, "mn-name", function(v){ d.name = v; }, "text"));
  body.push(h("div",{class:"fields two",style:"margin-top:10px"},
    fld("Amount", d.qty, "mn-qty", function(v){ d.qty = parseFloat(v)||1; }),
    h("div",{}, h("label",{class:"f",text:"Measured in"}),
      h("select",{class:"in","data-fk":"mn-unit",onchange:function(e){ d.unit = e.target.value; }},
        h("option",{value:"portion"},"portions"), h("option",{value:"g"},"grams"),
        h("option",{value:"slice"},"slices"), h("option",{value:"wrap"},"wraps")))
  ));
  body.push(h("div",{class:"fields two",style:"margin-top:10px"},
    fld("Calories", d.kcal, "mn-kcal", function(v){ d.kcal = v; }),
    fld("Protein (g)", d.p, "mn-p", function(v){ d.p = v; })
  ));
  body.push(h("div",{class:"fields two",style:"margin-top:10px"},
    fld("Carbs (g)", d.cb, "mn-cb", function(v){ d.cb = v; }),
    fld("Fat (g)", d.f, "mn-f", function(v){ d.f = v; })
  ));
  var savebox = h("button",{class:"check",style:"margin-top:12px",onclick:function(){
    d.save = !d.save;
    savebox.replaceChild(checkbox(d.save), savebox.firstChild);
  }}, checkbox(d.save), h("div",{}, h("strong",{text:"Keep this in my foods"}),
    h("div",{class:"xs muted",text:"It shows up in search next time"})));
  body.push(savebox);
  body.push(h("button",{class:"btn block red",style:"margin-top:14px",onclick:function(){
    if(!d.name.trim()){ toast("Give it a name."); return; }
    var kc = parseFloat(d.kcal)||0;
    var entry = {name:d.name.trim(), qty:d.qty, unit:d.unit, kcal:kc,
      p:parseFloat(d.p)||0, cb:parseFloat(d.cb)||0, f:parseFloat(d.f)||0};
    addCustomEntry(s.date, s.meal, entry);
    if(d.save){
      var per = d.unit === "g" ? (d.qty ? 100/d.qty : 1) : (1/(d.qty||1));
      S.plan.myFoods.push({ id:"u"+uid(), n:entry.name, c:"My foods", u:d.unit,
        kcal: Math.round(entry.kcal*per), p: Math.round(entry.p*per*10)/10,
        cb: Math.round(entry.cb*per*10)/10, f: Math.round(entry.f*per*10)/10, q:d.qty });
      touchPlan();
    }
    toast("Added to "+s.meal); closeSheet();
  }},"Add to diary"));
  return sheetShell("Manual entry", body, "Nothing here is guessed for you");
}
/* =========================================================================
   11. TRAIN
   ========================================================================= */
function ensureSession(date, wid){
  var d = day(date);
  if(!d.sessions[wid]) d.sessions[wid] = {done:false, status:"", missReason:"", note:"", log:{}, dur:null};
  if(d.sessions[wid].status === undefined) d.sessions[wid].status = d.sessions[wid].done ? "done" : "";
  if(d.sessions[wid].missReason === undefined) d.sessions[wid].missReason = "";
  return d.sessions[wid];
}
function lastSession(wid, beforeDate){
  var dates = Object.keys(S.days).filter(function(dt){
    return dt < beforeDate && S.days[dt].sessions && S.days[dt].sessions[wid]
      && Object.keys(S.days[dt].sessions[wid].log || {}).length;
  }).sort();
  if(!dates.length) return null;
  var dt = dates[dates.length-1];
  return { date:dt, s:S.days[dt].sessions[wid] };
}
function setsSummary(arr){
  if(!arr || !arr.length) return "";
  return arr.map(function(x){
    if(!x) return "—";
    return (x.reps || "—") + (x.load ? " @ "+x.load : "");
  }).join(", ");
}
function screenTrain(){
  var wrap = h("div",{}), w = weekOf(V.date) || S.plan.weeks[0];
  wrap.appendChild(h("div",{class:"eyebrow",style:"margin-top:14px",
    text:"Week "+w.num+" · "+fmtShort(w.days[0].date)+" - "+fmtShort(w.days[6].date)}));
  wrap.appendChild(h("h1",{class:"h1",text:"Training"}));
  wrap.appendChild(h("p",{class:"sub",
    text:"Main lifts 3 sets. Progress by cleaner reps and small increases, not by chasing fatigue."}));

  var strengthDone = weekSessionCount(w), cardioDone = weekCardioCount(w);
  var missedThis = weekMissedCount(w), openThis = weekOpenCount(w);
  var stat = h("section",{class:"card",style:"padding:0;overflow:hidden"});
  stat.appendChild(h("div",{class:"band"},"This week"));
  var g = h("div",{class:"metergrid"});
  g.appendChild(h("div",{class:"metercell"}, h("div",{class:"v num",text:strengthDone+" / 3"}),
    h("div",{class:"l",text:"Strength sessions"})));
  g.appendChild(h("div",{class:"metercell"}, h("div",{class:"v num",text:String(cardioDone)}),
    h("div",{class:"l",text:"Run, walk or sport logged"})));
  stat.appendChild(g);
  var g2 = h("div",{class:"metergrid"});
  g2.appendChild(h("div",{class:"metercell"},
    h("div",{class:"v num",style: missedThis ? "color:var(--warn)":"", text:String(missedThis)}),
    h("div",{class:"l",text:"Marked not done"})));
  g2.appendChild(h("div",{class:"metercell"}, h("div",{class:"v num",text:String(openThis)}),
    h("div",{class:"l",text:"Past days still unanswered"})));
  stat.appendChild(g2);
  wrap.appendChild(stat);

  var card = h("section",{class:"card",style:"padding:0;overflow:hidden"});
  card.appendChild(h("div",{class:"band"},"Sessions", h("span",{class:"spacer"}), h("span",{text:"Tap to log"})));
  var inner = h("div",{style:"padding:4px 14px 12px"});
  w.days.forEach(function(dp){
    var wk = workout(dp.wid) || BASE_WORKOUTS.rest;
    var st = dp.wid === "rest" ? "" : sessionStatus(dp.date, dp.wid);
    var sess = (S.days[dp.date] && S.days[dp.date].sessions && S.days[dp.date].sessions[dp.wid]) || null;
    var d = parseISO(dp.date);
    var sub = (dp.target ? dp.target : (wk.kind==="rest"?"Recovery and meal prep":"")) +
      (dp.when ? " · "+dp.when : "");
    if(st === "missed" && sess && sess.missReason) sub = "Not done — "+sess.missReason;
    inner.appendChild(h("button",{class:"check",style:"align-items:center",onclick:function(){
      if(wk.kind === "rest"){ V.date = dp.date; go("today"); return; }
      openSheet({type:"session", date:dp.date, wid:dp.wid});
    }},
      h("div",{style:"width:34px;flex:none;text-align:center"},
        h("div",{class:"xs muted",text:DOW[d.getDay()].toUpperCase()}),
        h("div",{style:"font-family:var(--display);font-size:18px;line-height:1",text:String(d.getDate())})),
      h("div",{class:"grow"},
        h("div",{class: st === "done" ? "strike":"", text:dp.label || wk.name}),
        h("div",{class:"xs muted",text:sub})),
      st ? h("span",{class:"stat "+st,text: st === "done" ? "DONE" : "NOT DONE"})
         : (wk.kind === "rest" ? null : svg(ICONS.fwd,{size:15,w:2.4}))
    ));
  });
  card.appendChild(inner);
  wrap.appendChild(card);

  wrap.appendChild(h("div",{class:"h2",text:"Workout library"}));
  var lib = h("section",{class:"card",style:"padding:2px 12px"});
  var aw = allWorkouts(), order = ["A","B","C","circuit"], k;
  for(k in aw) if(order.indexOf(k) < 0 && aw[k].ex && aw[k].ex.length) order.push(k);
  order.forEach(function(id){
    var wk = aw[id]; if(!wk) return;
    lib.appendChild(h("button",{class:"check",style:"align-items:center",onclick:function(){
      openSheet({type:"session", date:V.date, wid:id, adhoc:true});
    }},
      h("div",{class:"grow"}, h("div",{text:wk.name}),
        h("div",{class:"xs muted",text:wk.ex.length+" exercises"})),
      h("span",{class:"link",text:"Open"})
    ));
  });
  lib.appendChild(h("button",{class:"check",style:"align-items:center",onclick:function(){
    openSheet({type:"editWorkout", id:null});
  }}, h("div",{class:"grow"}, h("strong",{text:"Build a workout"}),
      h("div",{class:"xs muted",text:"Add your own exercises, sets and reps"})),
    svg(ICONS.plus,{size:16,w:2.6})));
  wrap.appendChild(lib);
  return wrap;
}
function sheetSession(s){
  var wk = workout(s.wid);
  if(!wk) return sheetShell("Session", [h("div",{class:"small",text:"That workout is gone."})]);
  var sess = ensureSession(s.date, s.wid);
  var dp = dayPlan(s.date);
  var prev = lastSession(s.wid, s.date);
  var body = [];

  if(dp && dp.wid === s.wid && dp.target)
    body.push(h("div",{class:"card small"}, h("strong",{text:"Target: "}), dp.target,
      dp.when ? h("span",{class:"muted",text:" · "+dp.when}) : null));
  if(prev)
    body.push(h("div",{class:"card small"}, h("div",{class:"eyebrow",text:"Last time — "+fmtDate(prev.date)}),
      h("div",{class:"xs muted",text:"Beat it by cleaner reps or a small increase, not by adding fatigue."})));

  if(wk.ex.length){
    wk.ex.forEach(function(ex, ei){
      if(!sess.log[ei]) sess.log[ei] = [];
      var prevArr = prev && prev.s.log ? prev.s.log[ei] : null;
      var card = h("div",{class:"card",style:"padding:0;overflow:hidden"});
      card.appendChild(h("div",{class:"band"}, ex.name, h("span",{class:"spacer"}),
        h("span",{text: ex.sets+" x "+ex.reps})));
      var inner = h("div",{style:"padding:8px 12px 12px"});
      if(ex.opt) inner.appendChild(h("div",{class:"xs muted",style:"margin-bottom:4px",text:"Optional"}));
      if(prevArr && prevArr.length)
        inner.appendChild(h("div",{class:"xs",style:"color:var(--red);margin-bottom:6px",
          text:"Last time: "+setsSummary(prevArr)}));
      for(var si=0; si<ex.sets; si++){
        (function(si){
          if(!sess.log[ei][si]) sess.log[ei][si] = {reps:"", load:"", on:false};
          var row = sess.log[ei][si];
          var line = h("div",{class:"row",style:"gap:8px;margin-top:6px"});
          var tick = h("button",{class:"box"+(row.on?" on":""),"aria-label":"Set "+(si+1)+" done",
            style:"cursor:pointer;background:"+(row.on?"var(--red)":"transparent"),
            onclick:function(){ row.on = !row.on; touchDay(s.date); render(); }},
            (function(){ var g=svg(ICONS.check,{size:13,w:3.4}); g.setAttribute("stroke", row.on?"var(--onred)":"transparent"); return g; })());
          line.appendChild(tick);
          line.appendChild(h("div",{class:"xs muted",style:"width:34px;flex:none",text:"Set "+(si+1)}));
          line.appendChild(h("input",{class:"in num grow",placeholder: prevArr && prevArr[si] ? String(prevArr[si].reps||"reps") : "reps",
            inputmode:"numeric","data-fk":"r-"+s.wid+"-"+ei+"-"+si, value:row.reps,
            oninput:function(e){ row.reps = e.target.value; },
            onchange:function(){ touchDay(s.date); }}));
          line.appendChild(h("input",{class:"in grow",placeholder: prevArr && prevArr[si] && prevArr[si].load ? String(prevArr[si].load) : "band / load",
            "data-fk":"l-"+s.wid+"-"+ei+"-"+si, value:row.load,
            oninput:function(e){ row.load = e.target.value; },
            onchange:function(){ touchDay(s.date); }}));
          inner.appendChild(line);
        })(si);
      }
      card.appendChild(inner);
      body.push(card);
    });
    if(wk.note) body.push(h("div",{class:"card xs muted",text:wk.note}));
  } else {
    body.push(h("div",{class:"card"},
      h("div",{class:"fields two"},
        fld("Distance (km)", sess.dist, "sess-dist", function(v){ sess.dist = v; touchDay(s.date); }),
        fld("Minutes", sess.dur, "sess-dur", function(v){ sess.dur = v; touchDay(s.date); })
      ),
      h("div",{class:"xs muted",style:"margin-top:8px",
        text: wk.id === "run" ? "Easy or moderate. Build gradually and don't focus on the time."
            : "Keep it easy. This is movement, not another training session."})
    ));
  }

  body.push(h("div",{style:"margin-top:10px"},
    h("label",{class:"f",text:"Notes"}),
    h("textarea",{class:"in","data-fk":"sess-note",rows:"2",placeholder:"How did it feel",
      value:sess.note, oninput:function(e){ sess.note = e.target.value; },
      onchange:function(){ touchDay(s.date); }})));

  var missed = sessionStatus(s.date, s.wid) === "missed";
  body.push(h("div",{class:"row",style:"gap:8px;margin-top:14px"},
    h("button",{class:"btn grow "+(sess.done ? "solid":"red"),onclick:function(){
      var st = setSessionStatus(s.date, s.wid, "done");
      toast(st === "done" ? "Session logged" : "No longer marked done");
      if(st === "done") closeSheet(); else render();
    }}, sess.done ? "Done — tap to undo" : "Mark session done"),
    h("button",{class:"btn grow"+(missed ? " warn":""),onclick:function(){
      var st = setSessionStatus(s.date, s.wid, "missed");
      toast(st === "missed" ? "Logged as not done" : "Cleared");
      render();
    }}, missed ? "Not done — tap to undo" : "I didn't do this one")
  ));
  if(missed) body.push(missReasonPicker(s.date, s.wid));
  if(!sess.done && !missed)
    body.push(h("div",{class:"card xs muted",style:"margin-top:10px",
      text:"Answering either way is what makes the Progress tab honest. A session left unanswered counts as neither."}));
  if(wk.kind === "strength")
    body.push(h("div",{class:"card xs muted",style:"margin-top:10px",
      text:"Short on time? A 20-minute circuit counts. Never restart the week over one missed session."}));
  return sheetShell(wk.name, body, fmtDate(s.date));
}
function sheetEditWorkout(s){
  var existing = s.id ? allWorkouts()[s.id] : null;
  if(!s.draft) s.draft = existing ? deep(existing)
    : {id:"u"+uid(), name:"", kind:"strength", note:"", ex:[{name:"",sets:3,reps:"10-15"}]};
  var d = s.draft;
  var body = [];
  body.push(fld("Workout name", d.name, "wk-name", function(v){ d.name = v; }, "text"));
  var list = h("div",{});
  function drawEx(){
    list.innerHTML = "";
    d.ex.forEach(function(ex, i){
      list.appendChild(h("div",{class:"card",style:"padding:10px"},
        h("div",{class:"row",style:"gap:8px"},
          h("div",{class:"grow"}, h("label",{class:"f",text:"Exercise "+(i+1)}),
            h("input",{class:"in","data-fk":"ex-n-"+i,value:ex.name,placeholder:"Exercise",
              oninput:function(e){ ex.name = e.target.value; }})),
          h("button",{class:"iconbtn","aria-label":"Remove",onclick:function(){
            d.ex.splice(i,1); if(!d.ex.length) d.ex.push({name:"",sets:3,reps:"10-15"}); drawEx(); }}, svg(ICONS.x,{w:2}))
        ),
        h("div",{class:"fields two",style:"margin-top:8px"},
          fld("Sets", ex.sets, "ex-s-"+i, function(v){ ex.sets = clamp(parseInt(v,10)||1,1,10); }),
          fld("Reps", ex.reps, "ex-r-"+i, function(v){ ex.reps = v; }, "text")
        )));
    });
    list.appendChild(h("button",{class:"btn sm ghost block",style:"margin-top:8px",onclick:function(){
      d.ex.push({name:"",sets:3,reps:"10-15"}); drawEx(); }},"Add an exercise"));
  }
  drawEx();
  body.push(list);
  body.push(h("button",{class:"btn block red",style:"margin-top:14px",onclick:function(){
    if(!d.name.trim()){ toast("Name the workout first."); return; }
    d.ex = d.ex.filter(function(e){ return e.name.trim(); });
    if(!d.ex.length){ toast("Add at least one exercise."); return; }
    S.plan.workouts[d.id] = d; touchPlan(); toast("Workout saved"); closeSheet();
  }}, existing ? "Save workout" : "Create workout"));
  if(existing && S.plan.workouts[s.id])
    body.push(h("button",{class:"btn block ghost",style:"margin-top:8px",onclick:function(){
      delete S.plan.workouts[s.id]; touchPlan(); toast("Workout removed"); closeSheet();
    }},"Delete workout"));
  return sheetShell(existing ? "Edit workout" : "New workout", body);
}
/* =========================================================================
   12. WEEKS
   ========================================================================= */
function nextWeekStart(){
  var ws = S.plan.weeks;
  if(!ws.length) return todayISO();
  var last = ws[ws.length-1];
  return addDays(last.start, 7);
}
function makeWeek(num, start, copyFromId){
  var src = null, i;
  if(copyFromId) for(i=0;i<S.plan.weeks.length;i++) if(S.plan.weeks[i].id === copyFromId) src = S.plan.weeks[i];
  var days = [];
  for(i=0;i<7;i++){
    var base = src ? src.days[i] : null;
    days.push({ date: addDays(start, i),
      wid: base ? base.wid : "rest",
      label: base ? base.label : "Rest",
      target: base ? base.target : "",
      when: base ? base.when : "",
      sport: base ? base.sport : "",
      note: "" });
  }
  return { id:"w"+uid(), num:num, start:start, mealPrepDone:false, takeaways:0, notes:"", days:days };
}
function screenWeeks(){
  var wrap = h("div",{});
  wrap.appendChild(h("h1",{class:"h1",style:"margin-top:16px",text:"Weeks"}));
  wrap.appendChild(h("p",{class:"sub",
    text:"Week 1 is set up as you wrote it. Add the next week when you want it, blank or copied from a week you liked."}));

  S.plan.weeks.forEach(function(w){
    var card = h("section",{class:"card",style:"padding:0;overflow:hidden"});
    card.appendChild(h("div",{class:"band"},
      h("span",{style:"font-family:var(--display);font-size:15px",text:"Week "+w.num}),
      h("span",{class:"spacer"}),
      h("span",{text:fmtShort(w.days[0].date)+" - "+fmtShort(w.days[6].date)})));
    var inner = h("div",{style:"padding:4px 14px 12px"});
    w.days.forEach(function(dp){
      var wk = workout(dp.wid) || BASE_WORKOUTS.rest;
      var d = parseISO(dp.date);
      inner.appendChild(h("button",{class:"check",style:"align-items:center",onclick:function(){
        openSheet({type:"editDay", weekId:w.id, date:dp.date});
      }},
        h("div",{class:"xs muted",style:"width:32px;flex:none;font-weight:700",text:DOW[d.getDay()].toUpperCase()}),
        h("div",{class:"grow"},
          h("div",{text:dp.label || wk.name}),
          h("div",{class:"xs muted",text:[dp.target, dp.when, dp.sport].filter(Boolean).join(" · ") || "—"})),
        h("span",{class:"link",text:"Edit"})
      ));
    });
    inner.appendChild(h("div",{class:"row wrap",style:"gap:8px;margin-top:12px"},
      h("button",{class:"btn sm red",onclick:function(){ V.date = w.days[0].date; go("today"); }},"Open week"),
      h("button",{class:"btn sm",onclick:function(){ openSheet({type:"checkin", weekId:w.id}); }},"Check-in"),
      S.plan.weeks.length > 1 ? h("button",{class:"btn sm ghost",onclick:function(){
        if(w.id === "w1"){ toast("Week 1 stays put."); return; }
        S.plan.weeks = S.plan.weeks.filter(function(x){ return x.id !== w.id; });
        touchPlan(); toast("Week removed"); render();
      }},"Remove") : null
    ));
    card.appendChild(inner);
    wrap.appendChild(card);
  });
  wrap.appendChild(h("button",{class:"btn block red",style:"margin-top:12px",onclick:function(){
    openSheet({type:"addWeek"}); }},"Add a week"));
  wrap.appendChild(h("div",{class:"card xs muted",style:"margin-top:12px",
    text:"On a week with no men's worship on Wednesday, that slot is your sport trial. Football, badminton, BJJ, boxing, tennis, basketball and swimming all work. Once one sticks, make it the regular Wednesday or Friday."}));
  return wrap;
}
function sheetAddWeek(s){
  var d = { start: nextWeekStart(), copy: S.plan.weeks.length ? S.plan.weeks[S.plan.weeks.length-1].id : "" };
  var maxNum = 0;
  S.plan.weeks.forEach(function(w){ if(w.num > maxNum) maxNum = w.num; });
  var body = [];
  body.push(h("div",{}, h("label",{class:"f",text:"Starts on"}),
    h("input",{class:"in",type:"date","data-fk":"aw-start",value:d.start,
      onchange:function(e){ d.start = e.target.value || d.start; }})));
  var sel = h("select",{class:"in","data-fk":"aw-copy",onchange:function(e){ d.copy = e.target.value; }},
    h("option",{value:""},"Blank week"));
  S.plan.weeks.forEach(function(w){
    var o = h("option",{value:w.id},"Copy Week "+w.num);
    if(w.id === d.copy) o.setAttribute("selected","");
    sel.appendChild(o);
  });
  body.push(h("div",{style:"margin-top:10px"}, h("label",{class:"f",text:"Start from"}), sel));
  body.push(h("div",{class:"card xs muted",style:"margin-top:10px",
    text:"Copying brings across the sessions, targets and timings. Your logs stay with their own dates."}));
  body.push(h("button",{class:"btn block red",style:"margin-top:14px",onclick:function(){
    S.plan.weeks.push(makeWeek(maxNum+1, d.start, d.copy || null));
    S.plan.weeks.sort(function(a,b){ return a.start < b.start ? -1 : 1; });
    touchPlan(); toast("Week "+(maxNum+1)+" added"); closeSheet();
  }},"Add week "+(maxNum+1)));
  return sheetShell("Add a week", body);
}
function sheetEditDay(s){
  var w = null, i;
  for(i=0;i<S.plan.weeks.length;i++) if(S.plan.weeks[i].id === s.weekId) w = S.plan.weeks[i];
  if(!w) return sheetShell("Day", [h("div",{class:"small",text:"That week is gone."})]);
  var dp = null;
  for(i=0;i<w.days.length;i++) if(w.days[i].date === s.date) dp = w.days[i];
  if(!dp) return sheetShell("Day", [h("div",{class:"small",text:"That day is gone."})]);
  if(!s.draft) s.draft = deep(dp);
  var d = s.draft;
  var body = [];
  var aw = allWorkouts();
  var sel = h("select",{class:"in","data-fk":"ed-wid",onchange:function(e){
    d.wid = e.target.value;
    var wk = aw[d.wid];
    if(wk && (!d.label || Object.keys(aw).some(function(k){ return aw[k].name === d.label; }))) d.label = wk.name;
    render();
  }});
  Object.keys(aw).forEach(function(k){
    var o = h("option",{value:k}, aw[k].name);
    if(k === d.wid) o.setAttribute("selected","");
    sel.appendChild(o);
  });
  body.push(h("div",{}, h("label",{class:"f",text:"Session"}), sel));
  body.push(h("div",{style:"margin-top:10px"}, fld("What you call it", d.label, "ed-label", function(v){ d.label = v; }, "text")));
  body.push(h("div",{class:"fields two",style:"margin-top:10px"},
    fld("Target", d.target, "ed-target", function(v){ d.target = v; }, "text"),
    fld("When", d.when, "ed-when", function(v){ d.when = v; }, "text")
  ));
  if(d.wid === "sport"){
    var ss = h("select",{class:"in","data-fk":"ed-sport",onchange:function(e){ d.sport = e.target.value; }},
      h("option",{value:""},"Pick a sport"));
    SPORTS.forEach(function(sp){
      var o = h("option",{value:sp}, sp);
      if(sp === d.sport) o.setAttribute("selected","");
      ss.appendChild(o);
    });
    body.push(h("div",{style:"margin-top:10px"}, h("label",{class:"f",text:"Which sport"}), ss));
    body.push(h("div",{style:"margin-top:10px"}, fld("Or type it", d.sport, "ed-sport2", function(v){ d.sport = v; }, "text")));
  }
  body.push(h("div",{style:"margin-top:10px"}, h("label",{class:"f",text:"Note"}),
    h("textarea",{class:"in","data-fk":"ed-note",rows:"2",value:d.note,
      oninput:function(e){ d.note = e.target.value; }})));
  body.push(h("button",{class:"btn block red",style:"margin-top:14px",onclick:function(){
    dp.wid = d.wid; dp.label = d.label || (aw[d.wid] ? aw[d.wid].name : "");
    dp.target = d.target; dp.when = d.when; dp.sport = d.sport; dp.note = d.note;
    touchPlan(); toast("Day updated"); closeSheet();
  }},"Save day"));
  return sheetShell(fmtDate(s.date), body, "Week "+w.num);
}

/* =========================================================================
   13. PROGRESS
   ========================================================================= */
function seriesFor(field, days){
  var out = [], i, dates = [];
  var end = todayISO();
  for(i=days-1;i>=0;i--) dates.push(addDays(end, -i));
  dates.forEach(function(dt){
    var d = S.days[dt];
    var v = null;
    if(d){
      if(field === "kcal") v = dayTotals(dt).kcal;
      else if(field === "p") v = dayTotals(dt).p;
      else v = d[field];
    }
    out.push({date:dt, v: (v === 0 && field !== "kcal" && field !== "p") ? null : v});
  });
  return out;
}
function lineChart(series, opts){
  var W = 320, H = 96, pad = {l:26,r:6,t:8,b:16};
  var pts = series.filter(function(p){ return p.v != null; });
  var box = h("div",{});
  if(pts.length < 2){
    box.appendChild(h("div",{class:"card small muted",
      text:opts.empty || "Two readings are needed before a trend means anything."}));
    return box;
  }
  var vals = pts.map(function(p){ return p.v; });
  var min = Math.min.apply(null, vals), max = Math.max.apply(null, vals);
  if(max - min < (opts.minSpan||1)){ var mid=(max+min)/2; min = mid-(opts.minSpan||1)/2; max = mid+(opts.minSpan||1)/2; }
  var sv = document.createElementNS("http://www.w3.org/2000/svg","svg");
  sv.setAttribute("viewBox","0 0 "+W+" "+H); sv.setAttribute("class","chart");
  sv.setAttribute("preserveAspectRatio","none");
  sv.style.height = "112px";
  function X(i){ return pad.l + (i/(series.length-1))*(W-pad.l-pad.r); }
  function Y(v){ return pad.t + (1-(v-min)/(max-min))*(H-pad.t-pad.b); }
  [min,(min+max)/2,max].forEach(function(v){
    var ln = document.createElementNS("http://www.w3.org/2000/svg","line");
    ln.setAttribute("x1",pad.l); ln.setAttribute("x2",W-pad.r);
    ln.setAttribute("y1",Y(v)); ln.setAttribute("y2",Y(v));
    ln.setAttribute("stroke","var(--line)"); ln.setAttribute("stroke-width","1");
    sv.appendChild(ln);
    var tx = document.createElementNS("http://www.w3.org/2000/svg","text");
    tx.setAttribute("x",0); tx.setAttribute("y",Y(v)+3); tx.textContent = n1(v);
    sv.appendChild(tx);
  });
  var dstr = "", started = false;
  series.forEach(function(p,i){
    if(p.v == null) return;
    dstr += (started ? "L":"M") + X(i) + " " + Y(p.v); started = true;
  });
  var path = document.createElementNS("http://www.w3.org/2000/svg","path");
  path.setAttribute("d", dstr); path.setAttribute("fill","none");
  path.setAttribute("stroke","var(--red)"); path.setAttribute("stroke-width","2.5");
  path.setAttribute("stroke-linejoin","round"); path.setAttribute("vector-effect","non-scaling-stroke");
  sv.appendChild(path);
  series.forEach(function(p,i){
    if(p.v == null) return;
    var c = document.createElementNS("http://www.w3.org/2000/svg","circle");
    c.setAttribute("cx",X(i)); c.setAttribute("cy",Y(p.v)); c.setAttribute("r","2.5");
    c.setAttribute("fill","var(--red)"); sv.appendChild(c);
  });
  box.appendChild(sv);
  box.appendChild(h("div",{class:"xs muted",style:"display:flex;justify-content:space-between",
    }, h("span",{text:fmtShort(series[0].date)}), h("span",{text:fmtShort(series[series.length-1].date)})));
  return box;
}
function barChart(series, band, unit){
  var W = 320, H = 96, pad = {l:28,r:6,t:8,b:16};
  var max = Math.max(band.max * 1.15, Math.max.apply(null, series.map(function(p){ return p.v||0; })) * 1.1, 10);
  var sv = document.createElementNS("http://www.w3.org/2000/svg","svg");
  sv.setAttribute("viewBox","0 0 "+W+" "+H); sv.setAttribute("class","chart");
  sv.setAttribute("preserveAspectRatio","none"); sv.style.height = "112px";
  function Y(v){ return pad.t + (1-v/max)*(H-pad.t-pad.b); }
  var rect = document.createElementNS("http://www.w3.org/2000/svg","rect");
  rect.setAttribute("x",pad.l); rect.setAttribute("width",W-pad.l-pad.r);
  rect.setAttribute("y",Y(band.max)); rect.setAttribute("height",Math.max(1,Y(band.min)-Y(band.max)));
  rect.setAttribute("fill","var(--red)"); rect.setAttribute("opacity","0.14");
  sv.appendChild(rect);
  [0,band.min,band.max].forEach(function(v){
    var tx = document.createElementNS("http://www.w3.org/2000/svg","text");
    tx.setAttribute("x",0); tx.setAttribute("y",Y(v)+3); tx.textContent = v >= 1000 ? Math.round(v/100)/10+"k" : n0(v);
    sv.appendChild(tx);
  });
  var bw = (W-pad.l-pad.r)/series.length;
  series.forEach(function(p,i){
    if(!p.v) return;
    var r = document.createElementNS("http://www.w3.org/2000/svg","rect");
    r.setAttribute("x", pad.l + i*bw + bw*0.16);
    r.setAttribute("width", bw*0.68);
    r.setAttribute("y", Y(p.v));
    r.setAttribute("height", Math.max(1, (H-pad.b) - Y(p.v)));
    r.setAttribute("fill", p.v >= band.min ? "var(--red)" : "var(--ink2)");
    sv.appendChild(r);
  });
  var base = document.createElementNS("http://www.w3.org/2000/svg","line");
  base.setAttribute("x1",pad.l); base.setAttribute("x2",W-pad.r);
  base.setAttribute("y1",H-pad.b); base.setAttribute("y2",H-pad.b);
  base.setAttribute("stroke","var(--ink)"); base.setAttribute("stroke-width","1");
  sv.appendChild(base);
  var box = h("div",{}, sv);
  box.appendChild(h("div",{class:"legend"},
    h("span",{}, h("i",{}), "inside or above your "+unit+" range"),
    h("span",{}, h("i",{style:"background:var(--ink2)"}), "below it")));
  return box;
}
function weekAvgWeight(w){
  var sum = 0, n = 0;
  w.days.forEach(function(dp){
    var d = S.days[dp.date];
    if(d && d.weight != null){ sum += d.weight; n++; }
  });
  return n ? Math.round(sum/n*10)/10 : null;
}
/* Sessions kept against sessions dropped, and the reasons behind the drops.
   This is the part of the record that is easy to avoid looking at. */
function consistencyCard(){
  var doneN = 0, missN = 0, openN = 0, t = todayISO();
  S.plan.weeks.forEach(function(w){
    w.days.forEach(function(dp){
      if(dp.wid === "rest") return;
      var st = sessionStatus(dp.date, dp.wid);
      if(st === "done") doneN++;
      else if(st === "missed") missN++;
      else if(dp.date < t) openN++;
    });
  });
  var answered = doneN + missN;
  var rate = answered ? Math.round(doneN/answered*100) : null;

  var wrap = h("div",{});
  wrap.appendChild(h("div",{class:"h2",text:"Sessions kept and missed"}));
  var card = h("section",{class:"card",style:"padding:0;overflow:hidden"});
  card.appendChild(h("div",{class:"band"},"All weeks so far", h("span",{class:"spacer"}),
    h("span",{text: rate == null ? "Nothing answered yet" : rate+"% of answered sessions done"})));
  var g = h("div",{class:"metergrid"});
  g.appendChild(h("div",{class:"metercell"},
    h("div",{class:"v num",style:"color:var(--good)",text:String(doneN)}),
    h("div",{class:"l",text:"Done"})));
  g.appendChild(h("div",{class:"metercell"},
    h("div",{class:"v num",style: missN ? "color:var(--warn)":"", text:String(missN)}),
    h("div",{class:"l",text:"Marked not done"})));
  card.appendChild(g);
  var g2 = h("div",{class:"metergrid"});
  g2.appendChild(h("div",{class:"metercell"}, h("div",{class:"v num",text:String(openN)}),
    h("div",{class:"l",text:"Past days unanswered"})));
  g2.appendChild(h("div",{class:"metercell"},
    h("div",{class:"v num",text: rate == null ? "—" : rate+"%"}),
    h("div",{class:"l",text:"Kept, of the ones you answered"})));
  card.appendChild(g2);
  wrap.appendChild(card);

  var tally = missReasonTally();
  if(tally.length){
    var rc = h("section",{class:"card",style:"padding:2px 12px"});
    rc.appendChild(h("div",{class:"eyebrow",style:"margin:10px 0 0",text:"What gets in the way"}));
    var top = tally[0].n;
    tally.forEach(function(r){
      rc.appendChild(h("div",{class:"listrow",style:"align-items:center"},
        h("div",{class:"grow"}, h("div",{class:"small",text:r.reason}),
          h("div",{style:"margin-top:5px"}, barEl(r.n/top))),
        h("div",{class:"num",style:"font-family:var(--display);font-size:20px",text:String(r.n)})));
    });
    wrap.appendChild(rc);
  }

  var list = missedList();
  if(list.length){
    var mc = h("section",{class:"card",style:"padding:0;overflow:hidden"});
    mc.appendChild(h("div",{class:"band"},"Every session you marked not done",
      h("span",{class:"spacer"}), h("span",{text:"Tap to change your mind"})));
    var inner = h("div",{style:"padding:4px 14px 12px"});
    list.slice(0,12).forEach(function(m){
      inner.appendChild(h("button",{class:"check",style:"align-items:center",onclick:function(){
        V.date = m.date; go("today");
      }},
        h("div",{class:"grow"},
          h("div",{text:m.label}),
          h("div",{class:"xs muted",text:"Week "+m.weekNum+" · "+fmtDate(m.date)+
            (m.reason ? " · "+m.reason : " · no reason given")})),
        h("span",{class:"stat missed",text:"NOT DONE"})
      ));
    });
    if(list.length > 12)
      inner.appendChild(h("div",{class:"xs muted",style:"margin-top:8px",
        text:"Showing the most recent 12 of "+list.length+"."}));
    mc.appendChild(inner);
    wrap.appendChild(mc);
  } else {
    wrap.appendChild(h("div",{class:"card small muted",
      text:"Nothing marked as not done yet. When you skip a session, say so on the Today tab — the pattern in the reasons is worth more than the count."}));
  }

  if(openN)
    wrap.appendChild(h("div",{class:"card xs muted",style:"margin-top:10px",
      text:openN+" planned "+(openN===1?"session has":"sessions have")+" gone by without an answer either way. They count as neither kept nor missed, so the figures above only cover what you have actually answered."}));
  return wrap;
}
function screenProgress(){
  var wrap = h("div",{});
  wrap.appendChild(h("h1",{class:"h1",style:"margin-top:16px",text:"Progress"}));
  wrap.appendChild(h("p",{class:"sub",text:"Weekly averages and consistency, not single-day perfection."}));

  wrap.appendChild(h("div",{class:"h2",text:"Weight trend"}));
  wrap.appendChild(h("div",{class:"card"}, lineChart(seriesFor("weight", 28),
    {minSpan:2, empty:"Log your weight on a few mornings and the trend line starts here."})));

  wrap.appendChild(h("div",{class:"h2",text:"Calories, last 14 days"}));
  wrap.appendChild(h("div",{class:"card"}, barChart(seriesFor("kcal",14),
    {min:S.plan.settings.kcalMin, max:S.plan.settings.kcalMax}, "calorie")));

  wrap.appendChild(h("div",{class:"h2",text:"Protein, last 14 days"}));
  wrap.appendChild(h("div",{class:"card"}, barChart(seriesFor("p",14),
    {min:S.plan.settings.proMin, max:S.plan.settings.proMax}, "protein")));

  wrap.appendChild(consistencyCard());

  wrap.appendChild(h("div",{class:"h2",text:"Week by week"}));
  var sc = h("div",{class:"scroller"});
  var tb = h("table",{});
  tb.appendChild(h("thead",{}, h("tr",{},
    h("th",{},"Week"), h("th",{},"Dates"), h("th",{},"Avg wt"), h("th",{},"Waist"),
    h("th",{},"Strength"), h("th",{},"Cardio"), h("th",{},"Missed"), h("th",{},"Takeaway"), h("th",{},"Prep"))));
  var tbody = h("tbody",{});
  S.plan.weeks.forEach(function(w){
    var waist = null;
    w.days.forEach(function(dp){ var d = S.days[dp.date]; if(d && d.waist != null) waist = d.waist; });
    var avg = weekAvgWeight(w);
    tbody.appendChild(h("tr",{},
      h("td",{}, String(w.num)),
      h("td",{}, fmtShort(w.days[0].date)+" - "+fmtShort(w.days[6].date)),
      h("td",{class:"num"}, avg == null ? "—" : n1(avg)),
      h("td",{class:"num"}, waist == null ? "—" : n1(waist)),
      h("td",{class:"num"}, weekSessionCount(w)+" / 3"),
      h("td",{class:"num"}, String(weekCardioCount(w))),
      h("td",{class:"num", style: weekMissedCount(w) ? "color:var(--warn);font-weight:700" : ""},
        String(weekMissedCount(w))),
      h("td",{class:"num"}, String(w.takeaways||0)),
      h("td",{}, w.mealPrepDone ? "Yes" : "No")
    ));
  });
  tb.appendChild(tbody);
  sc.appendChild(tb);
  wrap.appendChild(sc);

  wrap.appendChild(h("div",{class:"card",style:"margin-top:14px"},
    h("div",{class:"eyebrow",text:"What success looks like by New Year"}),
    h("div",{class:"small",text:"A lighter waist and weight trend, stronger push-ups, squats and rows, better cardio, a sport you actually enjoy, and a food routine that survives a busy work or church week."})));
  return wrap;
}
function sheetCheckin(s){
  var w = null, i;
  for(i=0;i<S.plan.weeks.length;i++) if(S.plan.weeks[i].id === s.weekId) w = S.plan.weeks[i];
  if(!w) return sheetShell("Check-in", [h("div",{class:"small",text:"That week is gone."})]);
  var body = [], avg = weekAvgWeight(w);
  var missedW = weekMissedCount(w), openW = weekOpenCount(w);
  var rows = [
    ["Strength sessions", weekSessionCount(w)+" of 3", weekSessionCount(w) >= 2],
    ["Run, walk or sport", String(weekCardioCount(w)), weekCardioCount(w) >= 1],
    ["Sessions marked not done", String(missedW), missedW === 0],
    ["Planned takeaways", String(w.takeaways||0)+" of 1", (w.takeaways||0) <= 1],
    ["Two meals prepped", w.mealPrepDone ? "Done" : "Not yet", !!w.mealPrepDone],
    ["Average weight", avg == null ? "Not logged" : n1(avg)+" kg", avg != null]
  ];
  var card = h("div",{class:"card",style:"padding:2px 12px"});
  rows.forEach(function(r){
    card.appendChild(h("div",{class:"listrow",style:"align-items:center"},
      checkbox(r[2]), h("div",{class:"grow"}, r[0]),
      h("div",{class:"xs num muted",text:r[1]})));
  });
  body.push(card);
  if(missedW){
    var mlist = h("div",{class:"card",style:"padding:2px 12px;margin-top:10px"});
    mlist.appendChild(h("div",{class:"eyebrow",style:"margin:10px 0 0",text:"What you didn't do this week"}));
    w.days.forEach(function(dp){
      if(dp.wid === "rest" || !sessionMissed(dp.date, dp.wid)) return;
      var wk = workout(dp.wid) || BASE_WORKOUTS.rest;
      var reason = S.days[dp.date].sessions[dp.wid].missReason;
      mlist.appendChild(h("div",{class:"listrow"},
        h("div",{class:"grow"}, h("div",{class:"small",text:dp.label || wk.name}),
          h("div",{class:"xs muted",text:fmtDate(dp.date)+(reason ? " · "+reason : " · no reason given")}))));
    });
    body.push(mlist);
  }
  if(openW)
    body.push(h("div",{class:"card xs muted",style:"margin-top:10px",
      text:openW+" planned "+(openW===1?"session":"sessions")+" from this week went by unanswered. Mark them done or not done on the Train tab so the week reads true."}));
  body.push(h("div",{style:"margin-top:10px"}, h("label",{class:"f",text:"Notes for the week"}),
    h("textarea",{class:"in","data-fk":"ci-note",rows:"3",
      placeholder:"Energy, soreness, sleep. Is next Wednesday worship or sport?",
      value:w.notes||"", oninput:function(e){ w.notes = e.target.value; },
      onchange:function(){ touchPlan(); }})));
  body.push(h("div",{class:"card xs muted",style:"margin-top:10px",
    text:"If the weekly average is falling and strength and energy hold up, change nothing. If several weeks pass flat, make a small adjustment to portions or activity rather than a drastic cut."}));
  body.push(h("button",{class:"btn block red",style:"margin-top:12px",onclick:function(){
    touchPlan(); toast("Check-in saved"); closeSheet(); }},"Save check-in"));
  return sheetShell("Week "+w.num+" check-in", body, fmtShort(w.days[0].date)+" - "+fmtShort(w.days[6].date));
}
/* =========================================================================
   14. SETTINGS
   ========================================================================= */
function sheetSettings(){
  var s = S.plan.settings, body = [];
  body.push(h("div",{class:"eyebrow",text:"Daily targets"}));
  body.push(h("div",{class:"fields two"},
    fld("Calories, low end", s.kcalMin, "se-kmin", function(v){ s.kcalMin = parseInt(v,10)||s.kcalMin; touchPlan(); }),
    fld("Calories, high end", s.kcalMax, "se-kmax", function(v){ s.kcalMax = parseInt(v,10)||s.kcalMax; touchPlan(); })
  ));
  body.push(h("div",{class:"fields two",style:"margin-top:10px"},
    fld("Protein, low end (g)", s.proMin, "se-pmin", function(v){ s.proMin = parseInt(v,10)||s.proMin; touchPlan(); }),
    fld("Protein, high end (g)", s.proMax, "se-pmax", function(v){ s.proMax = parseInt(v,10)||s.proMax; touchPlan(); })
  ));
  body.push(h("div",{style:"margin-top:10px"},
    fld("Daily steps to aim for", s.steps, "se-steps", function(v){ s.steps = parseInt(v,10)||s.steps; touchPlan(); })));
  body.push(h("div",{class:"card xs muted",style:"margin-top:10px",
    text:"Your plan's starting range is 2,250-2,400 kcal and 150-170g protein, to be reviewed after at least two weeks of weekly averages. It is a practical starting point, not a medical prescription."}));

  body.push(h("div",{class:"h2",text:"Eating reminders"}));
  body.push(h("div",{class:"xs muted",style:"margin-bottom:8px",
    text:"These show on the Today timetable. Alerts that buzz your phone need the app build."}));
  var grid = h("div",{class:"fields two"});
  MEALS.forEach(function(m){
    grid.appendChild(h("div",{}, h("label",{class:"f",text:m.name+" ("+m.time+")"}),
      h("input",{class:"in",type:"time","data-fk":"se-t-"+m.key,value:s.mealTimes[m.key]||"",
        onchange:function(e){ s.mealTimes[m.key] = e.target.value; touchPlan(); render(); }})));
  });
  body.push(grid);

  body.push(h("div",{class:"h2",text:"Appearance"}));
  var row = h("div",{class:"row wrap",style:"gap:6px"});
  [["auto","Match device"],["light","Light"],["dark","Dark"]].forEach(function(t){
    row.appendChild(h("button",{class:"chip","aria-pressed": s.theme===t[0] ? "true":"false",
      onclick:function(){ s.theme = t[0]; applyTheme(); touchPlan(); render(); }, text:t[1]}));
  });
  body.push(row);

  body.push(h("div",{class:"h2",text:"Saving and sync"}));
  var st = syncStatus();
  body.push(h("div",{class:"card small"},
    h("div",{}, h("strong",{text:DB ? "Cloud sync is on" : "Saved on this device"})),
    h("div",{class:"xs muted",style:"margin-top:4px",
      text: DB ? "Everything is written to this device first, then pushed up. Log while you are offline and it syncs by itself when you are back on wifi or data. Open the same link on another device and the two catch up with each other."
               : "This view has no cloud connection, so your log lives in this browser only. It still works offline."}),
    h("div",{class:"xs",style:"margin-top:6px;color:var(--ink2)",text:"Status: "+st.label})));
  body.push(h("button",{class:"btn block ghost",style:"margin-top:10px",onclick:function(){
    if(!DB){ toast("No cloud connection in this view."); return; }
    SYNCERR=""; flush(); toast("Sync started");
  }},"Sync now"));

  body.push(h("div",{class:"h2",text:"Start again"}));
  body.push(h("button",{class:"btn block",onclick:function(){
    if(!window.confirm("Clear every log and week on this device and go back to Week 1 as written?")) return;
    S = freshStore();
    try{ localStorage.setItem(LS_KEY, JSON.stringify(S)); }catch(e){}
    S.dirty["app/plan"] = true;
    V.date = todayISO(); V.sheet = null;
    touchPlan(); toast("Reset to Week 1"); render();
  }},"Clear everything on this device"));

  body.push(h("div",{class:"card xs muted",style:"margin-top:14px",
    text:"This app is a general fitness and nutrition framework, not individual medical care. If you have a medical condition, take medication that affects weight or appetite, have a history of disordered eating, or develop concerning symptoms during exercise, speak to a qualified healthcare professional before pushing the plan further."}));
  return sheetShell("Settings", body);
}
function applyTheme(){
  var t = S.plan.settings.theme;
  if(t === "auto") document.documentElement.removeAttribute("data-theme");
  else document.documentElement.setAttribute("data-theme", t);
}

/* =========================================================================
   15. START
   ========================================================================= */
document.addEventListener("keydown", function(e){
  if(e.key === "Escape" && V.sheet) closeSheet();
});
S = loadLocal();
applyTheme();
if(!weekOf(V.date)) {
  var w1 = S.plan.weeks[0];
  if(todayISO() < w1.days[0].date || todayISO() > w1.days[6].date) V.date = w1.days[0].date;
}
render();
initSync();
