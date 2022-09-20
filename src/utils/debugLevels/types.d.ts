




// add your own categories for debugging here
// type DBG_CATEGORY = "PLANNING" | "SOME" | "OTHER"
type DBG_CATEGORY = CODE_CATEGORY



interface Memory {
  debug: {
    levels: {
      [key in DBG_CATEGORY]?: DBG_LEVEL;
    },
    log: string[],
  }
}

// type DBG_CAT_ROLE = "role"

type DBG_SILENT = 0;
type DBG_MIN = 1;
type DBG_QUIET = 2;
type DBG_LOW = 3;
type DBG_MILD = 4;
type DBG_OBSERVE = 5; // average
type DBG_WATCH = 6;
type DBG_HIGH = 7;
type DBG_SHOUT = 8;
type DBG_MAX = 9;



type DBG_LEVEL =
  | DBG_SILENT
  | DBG_MIN
  | DBG_QUIET
  | DBG_LOW
  | DBG_MILD
  | DBG_OBSERVE
  | DBG_WATCH
  | DBG_HIGH
  | DBG_SHOUT
  | DBG_MAX


