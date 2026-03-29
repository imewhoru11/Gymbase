export const MUSCLE_GROUP_LABELS = {
  胸:   { zh: '胸',   en: 'Chest' },
  肩:   { zh: '肩',   en: 'Shoulders' },
  背:   { zh: '背',   en: 'Back' },
  腿:   { zh: '腿',   en: 'Legs' },
  手臂: { zh: '手臂', en: 'Arms' },
  腹: { zh: '腹', en: 'Abs' },
}

export const CATEGORY_LABELS = {
  Barbell:    { zh: '杠铃', en: 'Barbell' },
  Dumbbell:   { zh: '哑铃', en: 'Dumbbell' },
  Machine:    { zh: '器械', en: 'Machine' },
  Bodyweight: { zh: '自重', en: 'Bodyweight' },
  Other:      { zh: '其他', en: 'Other' },
  '二头':     { zh: '二头', en: 'Biceps' },
  '三头':     { zh: '三头', en: 'Triceps' },
  '上腹':     { zh: '上腹', en: 'Upper Abs' },
  '下腹':     { zh: '下腹', en: 'Lower Abs' },
}

const zh = {
  nav: {
    home: '首页',
    log: '记录',
    history: '历史',
    progress: '进度',
    library: '动作库',
  },
  dashboard: {
    recent: '最近记录',
    exercises: '个动作',
  },
  session: {
    title: '新建训练',
    addExercise: '+ 添加动作',
    finish: '完成训练',
    selectExercise: '选择动作…',
    custom: '+ 自定义',
    libraryBack: '← 动作库',
    recent: '最近',
    exercisePlaceholder: '动作名称',
  },
  summary: {
    complete: '训练完成',
    exercises: '动作',
    heaviest: '最重',
    allExercises: '所有动作',
    done: '完成',
    viewDetail: '查看详情',
  },
  detail: {
    back: '← 返回',
    useTemplate: '使用为模板',
  },
  history: {
    title: '历史',
    all: '全部',
    export: '↓ 导出',
    backup: '↓ 备份',
    restore: '↑ 恢复',
    empty: '暂无记录',
    exercises: '个动作',
    top: '最重',
  },
  progress: {
    title: '进度',
    selectExercise: '选择动作…',
    noData: '暂无数据',
  },
  library: {
    title: '动作库',
    nav: '动作库',
    category: '分类',
    exercise: '动作',
    exerciseName: '动作名称',
    add: '添加',
    remove: '删除',
    custom: '自定义',
  },
}

const en = {
  nav: {
    home: 'Home',
    log: 'Log',
    history: 'History',
    progress: 'Progress',
    library: 'Library',
  },
  dashboard: {
    recent: 'Recent',
    exercises: 'exercises',
  },
  session: {
    title: 'New Session',
    addExercise: '+ Add Exercise',
    finish: 'Finish Session',
    selectExercise: 'Select exercise…',
    custom: '+ Custom',
    libraryBack: '← Library',
    recent: 'Recent',
    exercisePlaceholder: 'Exercise name',
  },
  summary: {
    complete: 'Session Complete',
    exercises: 'Exercises',
    heaviest: 'Heaviest',
    allExercises: 'All Exercises',
    done: 'Done',
    viewDetail: 'View Detail',
  },
  detail: {
    back: '← Back',
    useTemplate: 'Use as Template',
  },
  history: {
    title: 'History',
    all: 'All',
    export: '↓ Export',
    backup: '↓ Backup',
    restore: '↑ Restore',
    empty: 'No sessions yet.',
    exercises: 'exercises',
    top: 'Top',
  },
  progress: {
    title: 'Progress',
    selectExercise: 'Select exercise…',
    noData: 'No data for this period',
  },
  library: {
    title: 'Exercise Library',
    nav: 'Library',
    category: 'Category',
    exercise: 'Exercise',
    exerciseName: 'Exercise name',
    add: 'Add',
    remove: 'Remove',
    custom: 'custom',
  },
}

export const translations = { zh, en }
