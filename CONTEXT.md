
# GoldenPulse.AI - Modular Architecture Context

## Overview
This document describes the modular architecture implementation for GoldenPulse.AI, a wellness platform for Indian seniors.

## Architecture Decisions

### 1. Module Structure
```
src/modules/
├── core/                 # Core infrastructure
│   ├── di/              # Dependency injection
│   ├── interfaces/      # Module contracts
│   └── logging/         # Centralized logging
├── fitness/             # Health scoring and recommendations
├── dashboard/           # Widget management and data flow
├── games/              # Cognitive training games
├── shared/             # Common utilities and services
└── index.ts            # Module orchestrator
```

### 2. Design Principles

#### Modular Architecture
- **Single Responsibility**: Each module handles one domain
- **Dependency Injection**: Loose coupling through DI container
- **Interface Contracts**: Strict typing for module communication
- **Event-Driven**: Modules communicate through events when needed

#### Code Quality
- **JSDoc with @ai_context**: Every function documented for AI understanding
- **Structured Logging**: Module-specific loggers for debugging
- **Error Boundaries**: Centralized error handling
- **Health Monitoring**: Built-in health checks for each module

### 3. Module Dependencies
```
Core (logging, DI) 
├── Fitness (health calculations)
├── Dashboard (UI coordination) 
│   └── depends on: Fitness
└── Games (cognitive training)
```

### 4. Service Registration
Services are registered with the DI container during module initialization:
- `fitnessService`: Health calculations and recommendations
- `dashboardService`: Widget data management
- `gamesService`: Game progress and scoring

### 5. Backward Compatibility
- All existing functionality preserved
- Existing imports still work through re-exports
- Component interfaces unchanged
- No breaking changes to UI components

## AI Context Markers

### @ai_context Usage
- **Function Level**: Describes purpose, inputs, outputs
- **Business Logic**: Explains domain-specific rules
- **Integration Points**: Documents module communication
- **Performance**: Notes optimization considerations

### #ai-reason Tags
- Inline comments explaining implementation decisions
- Helps AI understand why specific approaches were chosen
- Documents trade-offs and alternatives considered

## Implementation Status

### ✅ Phase 1: Foundation (Completed)
- [x] Modular directory structure
- [x] Dependency injection container
- [x] Module interfaces and contracts
- [x] Core logging system
- [x] Service registration

### 🚧 Phase 2: Documentation (In Progress)
- [x] JSDoc with @ai_context markers
- [x] CONTEXT.md creation
- [ ] Interface contract validation
- [ ] Decision logging system

### ⏳ Phase 3: Quality Assurance (Planned)
- [ ] ESLint medical-grade configuration
- [ ] Impact simulation tools
- [ ] Test coverage analysis
- [ ] Risk assessment reporting

### ⏳ Phase 4: Knowledge Management (Planned)
- [ ] Decision logs (NDJSON format)
- [ ] Pattern library
- [ ] User correction tracking
- [ ] Continuous improvement system

## Testing Strategy
- **Unit Tests**: Each module service tested independently
- **Integration Tests**: Module communication validated
- **Health Checks**: System-wide health monitoring
- **Error Scenarios**: Graceful degradation testing

## Monitoring and Observability
- **Structured Logging**: Module-specific loggers
- **Health Endpoints**: Real-time module status
- **Error Tracking**: Centralized error collection
- **Performance Metrics**: Module-level performance data

## Future Enhancements
1. **Dynamic Module Loading**: Load modules on demand
2. **Configuration Management**: Environment-specific configs
3. **Event System**: Pub/sub for loose coupling
4. **Module Hot Reloading**: Development productivity
5. **Metrics Dashboard**: Real-time system health

## Troubleshooting
- Check module health: `moduleManager.getSystemHealth()`
- Enable debug logging: `Logger.setLevel(LogLevel.DEBUG)`
- Inspect DI container: `container.has(serviceName)`
- Module dependencies: Verify initialization order
