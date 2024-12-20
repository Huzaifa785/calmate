// src/app/dashboard/food/page.tsx
"use client";

import { useRef, useState } from "react";
import { ApiService } from "@/lib/api";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Camera, CameraIcon, Loader2, ClipboardList } from "lucide-react";
import { useFoodLogs } from "@/hooks/use-food-logs";
import { motion, AnimatePresence } from "framer-motion";
import { useDashboard } from "@/hooks/use-dashboard";

// Analyzing Animation Component
function AnalyzingAnimation() {
  return (
    <motion.div
      className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div
        className="bg-white rounded-2xl p-8 flex flex-col items-center max-w-sm w-full mx-4"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.8, opacity: 0 }}
      >
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          className="w-16 h-16 rounded-full border-4 border-primary border-t-transparent mb-4"
        />
        <h3 className="text-xl font-bold mb-2">Analyzing your food</h3>
        <p className="text-gray-500 text-center">
          Our AI is identifying the food and calculating nutrition info
        </p>
      </motion.div>
    </motion.div>
  );
}

export default function FoodLoggingPage() {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const { logs, loading, error, addLog } = useFoodLogs();
  const { calorieStatus } = useDashboard();

  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileUpload = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    setUploadError(null);

    try {
      const result = await ApiService.analyzeFoodImage(file);
      addLog(result);
    } catch (err) {
      setUploadError("Failed to analyze food image. Please try again.");
      console.error("Upload error:", err);
    } finally {
      setIsUploading(false);
      if (event.target) {
        event.target.value = "";
      }
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Header Section */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Food Log</h1>
        <p className="text-gray-500">
          Track your meals and monitor your nutrition
        </p>
      </div>

      {/* Upload Section */}
      <Card className="p-8 mb-8 bg-gradient-to-r from-green-50 to-blue-50">
        <div className="flex flex-col items-center text-center">
          <div className="mb-4 p-4 bg-white rounded-full shadow-sm">
            <CameraIcon className="w-8 h-8 text-primary" />
          </div>
          <h2 className="text-xl font-semibold mb-2">Log Your Meal</h2>
          <p className="text-gray-500 mb-6 max-w-md">
            Take a photo of your food and our AI will analyze its nutritional
            content
          </p>
          {calorieStatus && calorieStatus.goal > 0 ? (
            <>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleFileUpload}
                className="hidden"
                disabled={isUploading}
              />
              <Button
                size="lg"
                onClick={handleButtonClick}
                disabled={isUploading}
                className="relative overflow-hidden group"
              >
                {isUploading ? (
                  <div className="flex items-center space-x-2">
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Analyzing...</span>
                  </div>
                ) : (
                  <div className="flex items-center space-x-2">
                    <Camera className="w-4 h-4" />
                    <span>Take Photo</span>
                  </div>
                )}
              </Button>
            </>
          ) : (
            "Note: Set Calorie Goal in Settings."
          )}
        </div>
      </Card>

      {/* Error Messages */}
      <AnimatePresence>
        {(uploadError || error) && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="bg-red-50 text-red-500 p-4 rounded-lg mb-8"
          >
            {uploadError || error}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Food Logs */}
      {loading ? (
        <div className="flex items-center justify-center h-64">
          <Loader2 className="w-8 h-8 animate-spin text-primary" />
        </div>
      ) : logs.length === 0 ? (
        <Card className="p-12 text-center">
          <ClipboardList className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            No meals logged yet
          </h3>
          <p className="text-gray-500 max-w-sm mx-auto">
            Start tracking your nutrition by taking a photo of your meal
          </p>
        </Card>
      ) : (
        <div className="grid gap-6">
          {logs.map((log, index) => (
            <motion.div
              key={log.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="overflow-hidden hover:shadow-lg transition-shadow duration-200">
                <div className="flex flex-col md:flex-row">
                  <div className="md:w-1/3 relative h-48 md:h-auto">
                    <img
                      src={log.image_url}
                      alt={log.food_name}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.currentTarget.src = "https://placehold.co/600x400";
                      }}
                    />
                  </div>

                  <div className="flex-1 p-6">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="text-xl font-semibold capitalize">
                          {log.food_name}
                        </h3>
                        <p className="text-sm text-gray-500">
                          {new Date(log.timestamp).toLocaleString()}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-2xl font-bold text-primary">
                          {log.calories} cal
                        </p>
                        <p className="text-sm text-gray-500">
                          {log.portion_size}g
                        </p>
                      </div>
                    </div>

                    <div className="grid grid-cols-3 gap-4">
                      <div className="p-4 bg-gradient-to-br from-blue-50 to-blue-100/50 rounded-xl">
                        <p className="text-sm text-gray-600 mb-1">Protein</p>
                        <p className="text-xl font-semibold text-blue-700">
                          {log.macronutrients.protein}g
                        </p>
                      </div>
                      <div className="p-4 bg-gradient-to-br from-green-50 to-green-100/50 rounded-xl">
                        <p className="text-sm text-gray-600 mb-1">Carbs</p>
                        <p className="text-xl font-semibold text-green-700">
                          {log.macronutrients.carbs}g
                        </p>
                      </div>
                      <div className="p-4 bg-gradient-to-br from-yellow-50 to-yellow-100/50 rounded-xl">
                        <p className="text-sm text-gray-600 mb-1">Fats</p>
                        <p className="text-xl font-semibold text-yellow-700">
                          {log.macronutrients.fats}g
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      )}

      {/* Analyzing Animation Overlay */}
      <AnimatePresence>{isUploading && <AnalyzingAnimation />}</AnimatePresence>
    </div>
  );
}
