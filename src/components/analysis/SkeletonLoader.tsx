import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { motion } from 'framer-motion';

const SkeletonLoader = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: 'easeOut',
      },
    },
  };

  const pulseVariants = {
    pulse: {
      opacity: [0.5, 1, 0.5],
      transition: {
        duration: 2,
        repeat: Infinity,
        ease: 'easeInOut',
      },
    },
  };

  return (
    <motion.div
      className="space-y-6"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.div variants={itemVariants}>
        <Card className="bg-[hsl(var(--card-bg))]/70 backdrop-blur-sm border-0 shadow-lg overflow-hidden">
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent"
            animate={{
              x: ['-100%', '100%'],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: 'linear',
            }}
          />
          <CardHeader className="relative z-10">
            <div className="flex items-center justify-between">
              <motion.div variants={pulseVariants} animate="pulse">
                <Skeleton className="h-6 w-48" />
              </motion.div>
              <motion.div variants={pulseVariants} animate="pulse">
                <Skeleton className="h-4 w-24" />
              </motion.div>
            </div>
          </CardHeader>
          <CardContent className="space-y-6 relative z-10">
            {/* SaaS Concept Overview */}
            <motion.div variants={itemVariants}>
              <motion.div variants={pulseVariants} animate="pulse">
                <Skeleton className="h-5 w-32 mb-3" />
              </motion.div>
              <motion.div variants={pulseVariants} animate="pulse">
                <Skeleton className="h-20 w-full" />
              </motion.div>
            </motion.div>

            {/* Analysis Results Grid */}
            <motion.div
              className="grid grid-cols-1 lg:grid-cols-3 gap-6"
              variants={containerVariants}
            >
              {[1, 2, 3].map((i) => (
                <motion.div key={i} variants={itemVariants}>
                  <Card className="overflow-hidden">
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-transparent via-blue-100/20 to-transparent"
                      animate={{
                        x: ['-100%', '100%'],
                      }}
                      transition={{
                        duration: 2.5,
                        repeat: Infinity,
                        ease: 'linear',
                        delay: i * 0.2,
                      }}
                    />
                    <CardContent className="p-4 relative z-10">
                      <motion.div variants={pulseVariants} animate="pulse">
                        <Skeleton className="h-5 w-24 mb-3" />
                      </motion.div>
                      <motion.div variants={pulseVariants} animate="pulse">
                        <Skeleton className="h-16 w-full" />
                      </motion.div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </motion.div>

            {/* Detailed Analysis Table */}
            <motion.div variants={itemVariants}>
              <motion.div variants={pulseVariants} animate="pulse">
                <Skeleton className="h-5 w-32 mb-3" />
              </motion.div>
              <motion.div className="space-y-3" variants={containerVariants}>
                {[1, 2, 3].map((i) => (
                  <motion.div
                    key={i}
                    className="flex justify-between items-center p-4 border rounded overflow-hidden relative"
                    variants={itemVariants}
                    whileHover={{ scale: 1.02 }}
                    transition={{ duration: 0.2 }}
                  >
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-transparent via-purple-100/20 to-transparent"
                      animate={{
                        x: ['-100%', '100%'],
                      }}
                      transition={{
                        duration: 3,
                        repeat: Infinity,
                        ease: 'linear',
                        delay: i * 0.3,
                      }}
                    />
                    <div className="space-y-2 flex-1 relative z-10">
                      <motion.div variants={pulseVariants} animate="pulse">
                        <Skeleton className="h-4 w-32" />
                      </motion.div>
                      <motion.div variants={pulseVariants} animate="pulse">
                        <Skeleton className="h-3 w-48" />
                      </motion.div>
                    </div>
                    <motion.div variants={pulseVariants} animate="pulse" className="relative z-10">
                      <Skeleton className="h-6 w-16" />
                    </motion.div>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  );
};

export default SkeletonLoader;
