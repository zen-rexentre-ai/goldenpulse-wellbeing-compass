
-- Step 1: Add temporary TEXT columns to store the converted values
ALTER TABLE public.anonymous_wellness_calculations 
ADD COLUMN heart_related_level_temp TEXT DEFAULT 'none',
ADD COLUMN cancer_level_temp TEXT DEFAULT 'none',
ADD COLUMN others_level_temp TEXT DEFAULT 'none';

-- Step 2: Convert existing integer values to text in the temporary columns
UPDATE public.anonymous_wellness_calculations 
SET heart_related_level_temp = CASE 
    WHEN heart_related_level = 0 THEN 'none'
    WHEN heart_related_level BETWEEN 1 AND 33 THEN 'mild'
    WHEN heart_related_level BETWEEN 34 AND 66 THEN 'moderate'
    WHEN heart_related_level BETWEEN 67 AND 100 THEN 'severe'
    ELSE 'none'
END
WHERE heart_related_level IS NOT NULL;

UPDATE public.anonymous_wellness_calculations 
SET cancer_level_temp = CASE 
    WHEN cancer_level = 0 THEN 'none'
    WHEN cancer_level BETWEEN 1 AND 33 THEN 'mild'
    WHEN cancer_level BETWEEN 34 AND 66 THEN 'moderate'
    WHEN cancer_level BETWEEN 67 AND 100 THEN 'severe'
    ELSE 'none'
END
WHERE cancer_level IS NOT NULL;

UPDATE public.anonymous_wellness_calculations 
SET others_level_temp = CASE 
    WHEN others_level = 0 THEN 'none'
    WHEN others_level BETWEEN 1 AND 33 THEN 'mild'
    WHEN others_level BETWEEN 34 AND 66 THEN 'moderate'
    WHEN others_level BETWEEN 67 AND 100 THEN 'severe'
    ELSE 'none'
END
WHERE others_level IS NOT NULL;

-- Step 3: Drop the old integer columns
ALTER TABLE public.anonymous_wellness_calculations 
DROP COLUMN heart_related_level,
DROP COLUMN cancer_level,
DROP COLUMN others_level;

-- Step 4: Rename the temporary columns to the original names
ALTER TABLE public.anonymous_wellness_calculations 
RENAME COLUMN heart_related_level_temp TO heart_related_level;

ALTER TABLE public.anonymous_wellness_calculations 
RENAME COLUMN cancer_level_temp TO cancer_level;

ALTER TABLE public.anonymous_wellness_calculations 
RENAME COLUMN others_level_temp TO others_level;

-- Step 5: Add check constraints
ALTER TABLE public.anonymous_wellness_calculations 
ADD CONSTRAINT heart_related_level_check CHECK (heart_related_level IN ('none', 'mild', 'moderate', 'severe')),
ADD CONSTRAINT cancer_level_check CHECK (cancer_level IN ('none', 'mild', 'moderate', 'severe')),
ADD CONSTRAINT others_level_check CHECK (others_level IN ('none', 'mild', 'moderate', 'severe'));
