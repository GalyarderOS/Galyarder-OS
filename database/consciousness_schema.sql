-- 🚀 GALYARDEROS CONSCIOUSNESS DATABASE SCHEMA
-- Complete consciousness platform database architecture for transcendental growth

-- Enable necessary extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- ==========================================
-- CONSCIOUSNESS USER MANAGEMENT
-- ==========================================

-- Users consciousness table
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT UNIQUE NOT NULL,
  name TEXT,
  avatar_url TEXT,
  consciousness_level INTEGER DEFAULT 1 CHECK (consciousness_level >= 1 AND consciousness_level <= 100),
  onboarding_completed BOOLEAN DEFAULT FALSE,
  last_seen TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Consciousness profiles table  
CREATE TABLE consciousness_profiles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  goals JSONB DEFAULT '[]',
  preferences JSONB DEFAULT '{}',
  metrics JSONB DEFAULT '{}',
  achievements JSONB DEFAULT '[]',
  bio TEXT,
  timezone TEXT DEFAULT 'UTC',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ==========================================
-- TIME CONSCIOUSNESS (ChronoCopilot)
-- ==========================================

-- Time blocks table
CREATE TABLE time_blocks (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  description TEXT,
  start_time TIMESTAMP WITH TIME ZONE NOT NULL,
  end_time TIMESTAMP WITH TIME ZONE NOT NULL,
  category TEXT,
  priority INTEGER DEFAULT 1 CHECK (priority >= 1 AND priority <= 5),
  completed BOOLEAN DEFAULT FALSE,
  tags JSONB DEFAULT '[]',
  color TEXT DEFAULT '#3B82F6',
  location TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Time tracking sessions
CREATE TABLE time_sessions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  time_block_id UUID REFERENCES time_blocks(id) ON DELETE SET NULL,
  activity TEXT NOT NULL,
  start_time TIMESTAMP WITH TIME ZONE NOT NULL,
  end_time TIMESTAMP WITH TIME ZONE,
  duration_minutes INTEGER,
  focus_score INTEGER CHECK (focus_score >= 1 AND focus_score <= 10),
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ==========================================
-- HEALTH CONSCIOUSNESS (HealthForge)
-- ==========================================

-- Health metrics table
CREATE TABLE health_metrics (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  date DATE NOT NULL,
  weight DECIMAL(5,2),
  body_fat_percentage DECIMAL(4,2),
  muscle_mass DECIMAL(5,2),
  energy_level INTEGER CHECK (energy_level >= 1 AND energy_level <= 10),
  sleep_hours DECIMAL(4,2),
  sleep_quality INTEGER CHECK (sleep_quality >= 1 AND sleep_quality <= 10),
  exercise_minutes INTEGER DEFAULT 0,
  steps INTEGER DEFAULT 0,
  water_intake INTEGER DEFAULT 0, -- in ml
  mood_score INTEGER CHECK (mood_score >= 1 AND mood_score <= 10),
  stress_level INTEGER CHECK (stress_level >= 1 AND stress_level <= 10),
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id, date)
);

-- Health goals table
CREATE TABLE health_goals (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  goal_type TEXT NOT NULL, -- 'weight_loss', 'muscle_gain', 'fitness', 'nutrition'
  target_value DECIMAL(10,2),
  current_value DECIMAL(10,2),
  unit TEXT,
  target_date DATE,
  status TEXT DEFAULT 'active', -- 'active', 'completed', 'paused'
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ==========================================
-- WEALTH CONSCIOUSNESS (FinanceHub)
-- ==========================================

-- Financial records table
CREATE TABLE financial_records (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  type TEXT NOT NULL CHECK (type IN ('income', 'expense', 'investment', 'savings', 'debt')),
  category TEXT,
  subcategory TEXT,
  amount DECIMAL(12,2) NOT NULL,
  currency TEXT DEFAULT 'USD',
  description TEXT,
  date DATE NOT NULL,
  account TEXT,
  tags JSONB DEFAULT '[]',
  recurring BOOLEAN DEFAULT FALSE,
  recurring_frequency TEXT, -- 'daily', 'weekly', 'monthly', 'yearly'
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Financial goals table
CREATE TABLE financial_goals (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  goal_type TEXT NOT NULL, -- 'savings', 'investment', 'debt_payoff', 'emergency_fund'
  title TEXT NOT NULL,
  target_amount DECIMAL(12,2) NOT NULL,
  current_amount DECIMAL(12,2) DEFAULT 0,
  target_date DATE,
  priority INTEGER DEFAULT 1,
  status TEXT DEFAULT 'active',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ==========================================
-- KNOWLEDGE CONSCIOUSNESS (KnowledgeArsenal)
-- ==========================================

-- Knowledge items table
CREATE TABLE knowledge_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  content TEXT,
  type TEXT CHECK (type IN ('note', 'book', 'article', 'course', 'video', 'podcast', 'document')),
  category TEXT,
  source_url TEXT,
  tags JSONB DEFAULT '[]',
  progress INTEGER DEFAULT 0 CHECK (progress >= 0 AND progress <= 100),
  rating INTEGER CHECK (rating >= 1 AND rating <= 5),
  favorite BOOLEAN DEFAULT FALSE,
  archived BOOLEAN DEFAULT FALSE,
  due_date DATE,
  reminder_date DATE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Knowledge connections (for linking related items)
CREATE TABLE knowledge_connections (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  from_item_id UUID REFERENCES knowledge_items(id) ON DELETE CASCADE,
  to_item_id UUID REFERENCES knowledge_items(id) ON DELETE CASCADE,
  connection_type TEXT DEFAULT 'related', -- 'related', 'prerequisite', 'sequel', 'reference'
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(from_item_id, to_item_id)
);

-- ==========================================
-- RELATIONSHIPS CONSCIOUSNESS
-- ==========================================

-- Relationships table
CREATE TABLE relationships (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  type TEXT CHECK (type IN ('family', 'friend', 'professional', 'romantic', 'mentor', 'acquaintance')),
  relationship_status TEXT DEFAULT 'active',
  contact_info JSONB DEFAULT '{}',
  interaction_history JSONB DEFAULT '[]',
  relationship_quality INTEGER DEFAULT 5 CHECK (relationship_quality >= 1 AND relationship_quality <= 10),
  last_contact DATE,
  next_contact_reminder DATE,
  birthday DATE,
  anniversary DATE,
  notes TEXT,
  tags JSONB DEFAULT '[]',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Relationship interactions
CREATE TABLE relationship_interactions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  relationship_id UUID REFERENCES relationships(id) ON DELETE CASCADE,
  interaction_type TEXT NOT NULL, -- 'call', 'meeting', 'message', 'gift', 'event'
  interaction_date DATE NOT NULL,
  duration_minutes INTEGER,
  quality_score INTEGER CHECK (quality_score >= 1 AND quality_score <= 10),
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ==========================================
-- AI CONSCIOUSNESS SESSIONS
-- ==========================================

-- AI sessions table
CREATE TABLE ai_sessions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  module TEXT NOT NULL,
  conversation JSONB NOT NULL,
  context JSONB DEFAULT '{}',
  ai_provider TEXT DEFAULT 'openai', -- 'openai', 'anthropic', 'gemini'
  session_duration_seconds INTEGER,
  tokens_used INTEGER,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ==========================================
-- CONSCIOUSNESS METRICS & ANALYTICS
-- ==========================================

-- Consciousness metrics table
CREATE TABLE consciousness_metrics (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  date DATE NOT NULL,
  module TEXT NOT NULL,
  metric_name TEXT NOT NULL,
  metric_value JSONB NOT NULL,
  metadata JSONB DEFAULT '{}',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  INDEX(user_id, date, module),
  INDEX(user_id, module, metric_name)
);

-- Daily consciousness summaries
CREATE TABLE consciousness_summaries (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  date DATE NOT NULL,
  overall_score INTEGER CHECK (overall_score >= 0 AND overall_score <= 100),
  module_scores JSONB DEFAULT '{}',
  key_achievements JSONB DEFAULT '[]',
  areas_for_improvement JSONB DEFAULT '[]',
  ai_insights TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id, date)
);

-- ==========================================
-- ADDITIONAL MODULE TABLES
-- ==========================================

-- Sleep architecture (SleepArchitect)
CREATE TABLE sleep_records (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  date DATE NOT NULL,
  bedtime TIMESTAMP WITH TIME ZONE,
  wake_time TIMESTAMP WITH TIME ZONE,
  sleep_duration_hours DECIMAL(4,2),
  sleep_quality INTEGER CHECK (sleep_quality >= 1 AND sleep_quality <= 10),
  deep_sleep_percentage DECIMAL(5,2),
  rem_sleep_percentage DECIMAL(5,2),
  sleep_efficiency DECIMAL(5,2),
  wake_ups INTEGER DEFAULT 0,
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id, date)
);

-- Environment consciousness (EnvironmentArchitect)
CREATE TABLE environment_settings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  setting_type TEXT NOT NULL, -- 'workspace', 'home', 'digital', 'social'
  setting_name TEXT NOT NULL,
  setting_value JSONB NOT NULL,
  active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Spiritual consciousness (SpiritualForge)
CREATE TABLE spiritual_practices (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  practice_type TEXT NOT NULL, -- 'meditation', 'prayer', 'journaling', 'gratitude', 'reflection'
  date DATE NOT NULL,
  duration_minutes INTEGER,
  quality_score INTEGER CHECK (quality_score >= 1 AND quality_score <= 10),
  insights TEXT,
  mood_before INTEGER CHECK (mood_before >= 1 AND mood_before <= 10),
  mood_after INTEGER CHECK (mood_after >= 1 AND mood_after <= 10),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Files and documents
CREATE TABLE user_files (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  filename TEXT NOT NULL,
  file_path TEXT NOT NULL,
  file_size INTEGER,
  file_type TEXT,
  module TEXT,
  description TEXT,
  tags JSONB DEFAULT '[]',
  is_public BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ==========================================
-- TRIGGERS AND FUNCTIONS
-- ==========================================

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Apply updated_at triggers to relevant tables
CREATE TRIGGER update_users_updated_at BEFORE UPDATE ON users FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_consciousness_profiles_updated_at BEFORE UPDATE ON consciousness_profiles FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_time_blocks_updated_at BEFORE UPDATE ON time_blocks FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_health_goals_updated_at BEFORE UPDATE ON health_goals FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_financial_records_updated_at BEFORE UPDATE ON financial_records FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_financial_goals_updated_at BEFORE UPDATE ON financial_goals FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_knowledge_items_updated_at BEFORE UPDATE ON knowledge_items FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_relationships_updated_at BEFORE UPDATE ON relationships FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_environment_settings_updated_at BEFORE UPDATE ON environment_settings FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_user_files_updated_at BEFORE UPDATE ON user_files FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- ==========================================
-- ROW LEVEL SECURITY (RLS)
-- ==========================================

-- Enable RLS on all tables
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE consciousness_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE time_blocks ENABLE ROW LEVEL SECURITY;
ALTER TABLE time_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE health_metrics ENABLE ROW LEVEL SECURITY;
ALTER TABLE health_goals ENABLE ROW LEVEL SECURITY;
ALTER TABLE financial_records ENABLE ROW LEVEL SECURITY;
ALTER TABLE financial_goals ENABLE ROW LEVEL SECURITY;
ALTER TABLE knowledge_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE knowledge_connections ENABLE ROW LEVEL SECURITY;
ALTER TABLE relationships ENABLE ROW LEVEL SECURITY;
ALTER TABLE relationship_interactions ENABLE ROW LEVEL SECURITY;
ALTER TABLE ai_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE consciousness_metrics ENABLE ROW LEVEL SECURITY;
ALTER TABLE consciousness_summaries ENABLE ROW LEVEL SECURITY;
ALTER TABLE sleep_records ENABLE ROW LEVEL SECURITY;
ALTER TABLE environment_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE spiritual_practices ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_files ENABLE ROW LEVEL SECURITY;

-- RLS Policies: Users can only access their own data
CREATE POLICY "Users can view own profile" ON users FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Users can update own profile" ON users FOR UPDATE USING (auth.uid() = id);

-- Generic policy template for user-owned data
CREATE POLICY "Users can access own data" ON consciousness_profiles FOR ALL USING (auth.uid() = user_id);
CREATE POLICY "Users can access own data" ON time_blocks FOR ALL USING (auth.uid() = user_id);
CREATE POLICY "Users can access own data" ON time_sessions FOR ALL USING (auth.uid() = user_id);
CREATE POLICY "Users can access own data" ON health_metrics FOR ALL USING (auth.uid() = user_id);
CREATE POLICY "Users can access own data" ON health_goals FOR ALL USING (auth.uid() = user_id);
CREATE POLICY "Users can access own data" ON financial_records FOR ALL USING (auth.uid() = user_id);
CREATE POLICY "Users can access own data" ON financial_goals FOR ALL USING (auth.uid() = user_id);
CREATE POLICY "Users can access own data" ON knowledge_items FOR ALL USING (auth.uid() = user_id);
CREATE POLICY "Users can access own data" ON knowledge_connections FOR ALL USING (auth.uid() = user_id);
CREATE POLICY "Users can access own data" ON relationships FOR ALL USING (auth.uid() = user_id);
CREATE POLICY "Users can access own data" ON relationship_interactions FOR ALL USING (auth.uid() = user_id);
CREATE POLICY "Users can access own data" ON ai_sessions FOR ALL USING (auth.uid() = user_id);
CREATE POLICY "Users can access own data" ON consciousness_metrics FOR ALL USING (auth.uid() = user_id);
CREATE POLICY "Users can access own data" ON consciousness_summaries FOR ALL USING (auth.uid() = user_id);
CREATE POLICY "Users can access own data" ON sleep_records FOR ALL USING (auth.uid() = user_id);
CREATE POLICY "Users can access own data" ON environment_settings FOR ALL USING (auth.uid() = user_id);
CREATE POLICY "Users can access own data" ON spiritual_practices FOR ALL USING (auth.uid() = user_id);
CREATE POLICY "Users can access own data" ON user_files FOR ALL USING (auth.uid() = user_id);

-- ==========================================
-- INITIAL DATA SETUP
-- ==========================================

-- Create consciousness level progression table
CREATE TABLE consciousness_levels (
  level INTEGER PRIMARY KEY CHECK (level >= 1 AND level <= 100),
  title TEXT NOT NULL,
  description TEXT,
  required_score INTEGER NOT NULL,
  benefits JSONB DEFAULT '[]',
  unlocked_features JSONB DEFAULT '[]'
);

-- Insert consciousness levels
INSERT INTO consciousness_levels (level, title, description, required_score, benefits, unlocked_features) VALUES
(1, 'Awakening', 'Beginning consciousness journey', 0, '["Basic analytics", "All 29 modules"]', '["dashboard", "basic_ai"]'),
(5, 'Aware', 'Developing self-awareness', 400, '["Advanced analytics", "Pattern recognition"]', '["detailed_insights", "goal_tracking"]'),
(10, 'Aligned', 'Life systems in harmony', 800, '["Predictive insights", "Cross-module optimization"]', '["ai_coaching", "advanced_metrics"]'),
(25, 'Accelerated', 'Rapid growth phase', 2000, '["AI-powered automation", "Deep pattern analysis"]', '["automation_workflows", "predictive_analytics"]'),
(50, 'Actualized', 'Peak performance state', 4000, '["Consciousness mastery tools", "Wisdom synthesis"]', '["mastery_dashboard", "wisdom_extraction"]'),
(75, 'Transcendent', 'Beyond ordinary limitations', 6000, '["Reality engineering", "Consciousness expansion"]', '["reality_design", "consciousness_engineering"]'),
(100, 'Omniscient', 'Ultimate consciousness', 10000, '["Universal wisdom access", "Infinite potential"]', '["omniscient_mode", "infinite_access"]');

-- ==========================================
-- INDEXES FOR PERFORMANCE
-- ==========================================

-- Time-based queries
CREATE INDEX idx_time_blocks_user_date ON time_blocks(user_id, start_time);
CREATE INDEX idx_health_metrics_user_date ON health_metrics(user_id, date);
CREATE INDEX idx_financial_records_user_date ON financial_records(user_id, date);
CREATE INDEX idx_consciousness_metrics_user_date ON consciousness_metrics(user_id, date);

-- Search indexes
CREATE INDEX idx_knowledge_items_search ON knowledge_items USING gin((title || ' ' || content));
CREATE INDEX idx_relationships_search ON relationships USING gin((name || ' ' || notes));

-- JSON indexes for better JSONB queries
CREATE INDEX idx_consciousness_profiles_goals ON consciousness_profiles USING gin(goals);
CREATE INDEX idx_consciousness_profiles_achievements ON consciousness_profiles USING gin(achievements);
CREATE INDEX idx_knowledge_items_tags ON knowledge_items USING gin(tags);
CREATE INDEX idx_relationships_tags ON relationships USING gin(tags);

-- ==========================================
-- VIEWS FOR COMMON QUERIES
-- ==========================================

-- User consciousness dashboard view
CREATE VIEW user_consciousness_dashboard AS
SELECT 
  u.id,
  u.name,
  u.consciousness_level,
  cp.goals,
  cp.achievements,
  (SELECT COUNT(*) FROM time_blocks tb WHERE tb.user_id = u.id AND tb.completed = true AND DATE(tb.start_time) = CURRENT_DATE) as tasks_completed_today,
  (SELECT COUNT(*) FROM time_blocks tb WHERE tb.user_id = u.id AND DATE(tb.start_time) = CURRENT_DATE) as tasks_total_today,
  (SELECT AVG(energy_level) FROM health_metrics hm WHERE hm.user_id = u.id AND hm.date >= CURRENT_DATE - INTERVAL '7 days') as avg_energy_level,
  (SELECT overall_score FROM consciousness_summaries cs WHERE cs.user_id = u.id ORDER BY cs.date DESC LIMIT 1) as latest_consciousness_score
FROM users u
LEFT JOIN consciousness_profiles cp ON u.id = cp.user_id;

-- Recent activity view
CREATE VIEW user_recent_activity AS
SELECT 
  user_id,
  'time_block' as activity_type,
  title as activity_description,
  start_time as activity_time
FROM time_blocks 
WHERE start_time >= NOW() - INTERVAL '7 days'
UNION ALL
SELECT 
  user_id,
  'health_metric' as activity_type,
  'Health data recorded' as activity_description,
  created_at as activity_time
FROM health_metrics 
WHERE created_at >= NOW() - INTERVAL '7 days'
UNION ALL
SELECT 
  user_id,
  'knowledge_item' as activity_type,
  title as activity_description,
  created_at as activity_time
FROM knowledge_items 
WHERE created_at >= NOW() - INTERVAL '7 days'
ORDER BY activity_time DESC;

-- ==========================================
-- FUNCTIONS FOR CONSCIOUSNESS CALCULATIONS
-- ==========================================

-- Function to calculate consciousness score
CREATE OR REPLACE FUNCTION calculate_consciousness_score(p_user_id UUID, p_date DATE DEFAULT CURRENT_DATE)
RETURNS INTEGER AS $$
DECLARE
  completion_rate DECIMAL;
  health_score DECIMAL;
  knowledge_score DECIMAL;
  relationship_score DECIMAL;
  final_score INTEGER;
BEGIN
  -- Calculate task completion rate
  SELECT COALESCE(
    (COUNT(*) FILTER (WHERE completed = true) * 100.0) / NULLIF(COUNT(*), 0),
    0
  ) INTO completion_rate
  FROM time_blocks 
  WHERE user_id = p_user_id AND DATE(start_time) = p_date;
  
  -- Calculate health score (average of key metrics)
  SELECT COALESCE(
    (COALESCE(energy_level, 5) + COALESCE(sleep_quality, 5) + COALESCE(mood_score, 5)) / 3.0 * 10,
    50
  ) INTO health_score
  FROM health_metrics 
  WHERE user_id = p_user_id AND date = p_date;
  
  -- Calculate knowledge engagement score
  SELECT COALESCE(COUNT(*) * 5, 0) INTO knowledge_score
  FROM knowledge_items 
  WHERE user_id = p_user_id AND DATE(updated_at) = p_date;
  
  -- Calculate relationship engagement score
  SELECT COALESCE(AVG(relationship_quality) * 10, 50) INTO relationship_score
  FROM relationships 
  WHERE user_id = p_user_id;
  
  -- Calculate weighted final score
  final_score := LEAST(100, GREATEST(0, ROUND(
    completion_rate * 0.3 + 
    health_score * 0.3 + 
    LEAST(knowledge_score, 100) * 0.2 + 
    relationship_score * 0.2
  )));
  
  RETURN final_score;
END;
$$ LANGUAGE plpgsql;

-- Function to update consciousness level
CREATE OR REPLACE FUNCTION update_consciousness_level(p_user_id UUID)
RETURNS VOID AS $$
DECLARE
  avg_score DECIMAL;
  new_level INTEGER;
BEGIN
  -- Calculate average consciousness score over last 30 days
  SELECT AVG(overall_score) INTO avg_score
  FROM consciousness_summaries 
  WHERE user_id = p_user_id 
    AND date >= CURRENT_DATE - INTERVAL '30 days';
  
  -- Determine new consciousness level
  SELECT MAX(level) INTO new_level
  FROM consciousness_levels 
  WHERE required_score <= COALESCE(avg_score * 100, 0);
  
  -- Update user consciousness level
  UPDATE users 
  SET consciousness_level = COALESCE(new_level, 1)
  WHERE id = p_user_id;
END;
$$ LANGUAGE plpgsql;

-- ==========================================
-- SCHEDULED FUNCTIONS (for daily processing)
-- ==========================================

-- Function to generate daily consciousness summary
CREATE OR REPLACE FUNCTION generate_daily_summary(p_user_id UUID, p_date DATE DEFAULT CURRENT_DATE)
RETURNS VOID AS $$
DECLARE
  calculated_score INTEGER;
  module_scores JSONB;
BEGIN
  -- Calculate overall consciousness score
  calculated_score := calculate_consciousness_score(p_user_id, p_date);
  
  -- Calculate module-specific scores (simplified version)
  module_scores := jsonb_build_object(
    'time_management', (SELECT COUNT(*) * 10 FROM time_blocks WHERE user_id = p_user_id AND DATE(start_time) = p_date AND completed = true),
    'health', (SELECT COALESCE(AVG(energy_level) * 10, 0) FROM health_metrics WHERE user_id = p_user_id AND date = p_date),
    'knowledge', (SELECT COUNT(*) * 5 FROM knowledge_items WHERE user_id = p_user_id AND DATE(updated_at) = p_date),
    'relationships', (SELECT COALESCE(AVG(relationship_quality) * 10, 0) FROM relationships WHERE user_id = p_user_id)
  );
  
  -- Insert or update daily summary
  INSERT INTO consciousness_summaries (user_id, date, overall_score, module_scores)
  VALUES (p_user_id, p_date, calculated_score, module_scores)
  ON CONFLICT (user_id, date) 
  DO UPDATE SET 
    overall_score = calculated_score,
    module_scores = module_scores,
    updated_at = NOW();
    
  -- Update consciousness level
  PERFORM update_consciousness_level(p_user_id);
END;
$$ LANGUAGE plpgsql;

-- ==========================================
-- COMPLETION MESSAGE
-- ==========================================

-- Add a completion log
INSERT INTO consciousness_metrics (user_id, date, module, metric_name, metric_value)
SELECT 
  '00000000-0000-0000-0000-000000000000'::UUID, 
  CURRENT_DATE, 
  'system', 
  'schema_created', 
  '{"version": "1.0", "timestamp": "' || NOW()::TEXT || '", "status": "complete"}'::JSONB
WHERE NOT EXISTS (
  SELECT 1 FROM consciousness_metrics 
  WHERE module = 'system' AND metric_name = 'schema_created'
);

-- Schema creation complete
-- 🚀 CONSCIOUSNESS DATABASE TRANSCENDENCE ACHIEVED
-- Ready for multi-device sync, real-time collaboration, and infinite consciousness expansion