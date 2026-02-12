// ─── ACTUAL SCHEMA (from your Permify response) ────────────────────────────

const RAW_SCHEMA = {
  "schema": {
    "entity_definitions": {
      "repository": {
        "name": "repository",

        "relations": {
          "admin": {
            "name": "admin",
            "relation_references": [
              { "type": "user", "relation": "" }
            ]
          },

          "developer": {
            "name": "developer",
            "relation_references": [
              { "type": "user", "relation": "" }
            ]
          },

          "viewer": {
            "name": "viewer",
            "relation_references": [
              { "type": "user", "relation": "" }
            ]
          },

          "dev_team": {
            "name": "dev_team",
            "relation_references": [
              { "type": "team", "relation": "" }
            ]
          },

          "view_team": {
            "name": "view_team",
            "relation_references": [
              { "type": "team", "relation": "" }
            ]
          },

          "parent_org": {
            "name": "parent_org",
            "relation_references": [
              { "type": "organization", "relation": "" }
            ]
          }
        },

        "permissions": {

          "admin_access": {
            "name": "admin_access",
            "child": {
              "rewrite": {
                "rewrite_operation": "OPERATION_UNION",
                "children": [
                  {
                    "leaf": {
                      "computed_user_set": {
                        "relation": "admin"
                      }
                    }
                  },
                  {
                    "leaf": {
                      "tuple_to_user_set": {
                        "tupleSet": {
                          "relation": "parent_org"
                        },
                        "computed": {
                          "relation": "admin"
                        }
                      }
                    }
                  }
                ]
              }
            }
          },

          "developer_access": {
            "name": "developer_access",
            "child": {
              "rewrite": {
                "rewrite_operation": "OPERATION_UNION",
                "children": [

                  {
                    "leaf": {
                      "computed_user_set": {
                        "relation": "developer"
                      }
                    }
                  },

                  {
                    "leaf": {
                      "tuple_to_user_set": {
                        "tupleSet": {
                          "relation": "dev_team"
                        },
                        "computed": {
                          "relation": "member"
                        }
                      }
                    }
                  },

                  {
                    "leaf": {
                      "tuple_to_user_set": {
                        "tupleSet": {
                          "relation": "dev_team"
                        },
                        "computed": {
                          "relation": "maintainer"
                        }
                      }
                    }
                  },

                  {
                    "leaf": {
                      "computed_user_set": {
                        "relation": "admin_access"
                      }
                    }
                  }
                ]
              }
            }
          },

          "viewer_access": {
            "name": "viewer_access",
            "child": {
              "rewrite": {
                "rewrite_operation": "OPERATION_UNION",
                "children": [

                  {
                    "leaf": {
                      "computed_user_set": {
                        "relation": "viewer"
                      }
                    }
                  },

                  {
                    "leaf": {
                      "tuple_to_user_set": {
                        "tupleSet": {
                          "relation": "view_team"
                        },
                        "computed": {
                          "relation": "member"
                        }
                      }
                    }
                  },

                  {
                    "leaf": {
                      "tuple_to_user_set": {
                        "tupleSet": {
                          "relation": "view_team"
                        },
                        "computed": {
                          "relation": "maintainer"
                        }
                      }
                    }
                  },

                  {
                    "leaf": {
                      "computed_user_set": {
                        "relation": "developer_access"
                      }
                    }
                  }
                ]
              }
            }
          },

          "push_code": {
            "name": "push_code",
            "child": {
              "leaf": {
                "computed_user_set": {
                  "relation": "developer_access"
                }
              }
            }
          },

          "pull_code": {
            "name": "pull_code",
            "child": {
              "leaf": {
                "computed_user_set": {
                  "relation": "viewer_access"
                }
              }
            }
          },

          "manage_repository": {
            "name": "manage_repository",
            "child": {
              "leaf": {
                "computed_user_set": {
                  "relation": "admin_access"
                }
              }
            }
          },

          "delete_repository": {
            "name": "delete_repository",
            "child": {
              "leaf": {
                "computed_user_set": {
                  "relation": "admin_access"
                }
              }
            }
          }
        },

        "attributes": {},

        "references": {
          "admin": "REFERENCE_RELATION",
          "developer": "REFERENCE_RELATION",
          "viewer": "REFERENCE_RELATION",
          "dev_team": "REFERENCE_RELATION",
          "view_team": "REFERENCE_RELATION",
          "parent_org": "REFERENCE_RELATION",

          "admin_access": "REFERENCE_PERMISSION",
          "developer_access": "REFERENCE_PERMISSION",
          "viewer_access": "REFERENCE_PERMISSION",
          "push_code": "REFERENCE_PERMISSION",
          "pull_code": "REFERENCE_PERMISSION",
          "manage_repository": "REFERENCE_PERMISSION",
          "delete_repository": "REFERENCE_PERMISSION"
        }
      },

      "team": {
        "name": "team",

        "relations": {
          "member": {
            "name": "member",
            "relation_references": [
              { "type": "user", "relation": "" }
            ]
          },

          "maintainer": {
            "name": "maintainer",
            "relation_references": [
              { "type": "user", "relation": "" }
            ]
          }
        },

        "permissions": {
          "manage_team": {
            "name": "manage_team",
            "child": {
              "leaf": {
                "computed_user_set": {
                  "relation": "maintainer"
                }
              }
            }
          },

          "view_team": {
            "name": "view_team",
            "child": {
              "rewrite": {
                "rewrite_operation": "OPERATION_UNION",
                "children": [
                  {
                    "leaf": {
                      "computed_user_set": {
                        "relation": "member"
                      }
                    }
                  },
                  {
                    "leaf": {
                      "computed_user_set": {
                        "relation": "maintainer"
                      }
                    }
                  }
                ]
              }
            }
          }
        },

        "attributes": {},

        "references": {
          "member": "REFERENCE_RELATION",
          "maintainer": "REFERENCE_RELATION",
          "manage_team": "REFERENCE_PERMISSION",
          "view_team": "REFERENCE_PERMISSION"
        }
      },

      "organization": {
        "name": "organization",

        "relations": {
          "admin": {
            "name": "admin",
            "relation_references": [
              { "type": "user", "relation": "" }
            ]
          }
        },

        "permissions": {
          "manage_repositories": {
            "name": "manage_repositories",
            "child": {
              "leaf": {
                "computed_user_set": {
                  "relation": "admin"
                }
              }
            }
          }
        },

        "attributes": {},

        "references": {
          "admin": "REFERENCE_RELATION",
          "manage_repositories": "REFERENCE_PERMISSION"
        }
      },

      "user": {
        "name": "user",
        "relations": {},
        "permissions": {},
        "attributes": {},
        "references": {}
      }
    },

    "rule_definitions": {},

    "references": {
      "repository": "REFERENCE_ENTITY",
      "team": "REFERENCE_ENTITY",
      "organization": "REFERENCE_ENTITY",
      "user": "REFERENCE_ENTITY"
    }
  }
};

// ─── PARSER ────────────────────────────────────────────────────────────────

function parseSchema(apiResponse) {
  const entityDefs = apiResponse.schema.entity_definitions;
  const entities = [];

  for (const [entityName, entityData] of Object.entries(entityDefs)) {
    // Parse relations
    const relations = [];
    for (const [relName, relData] of Object.entries(entityData.relations || {})) {
      const refs = relData.relation_references || [];
      refs.forEach(ref => {
        relations.push({
          name: relName,
          type: ref.type
        });
      });
    }

    // Parse permissions (just the names)
    const permissions = Object.keys(entityData.permissions || {});

    // Figure out which permissions each relation grants
    // We look at permission names to infer this
    const relationsWithPerms = relations.map(rel => {
      const grants = permissions.filter(p =>
        p.includes(rel.name) || p === 'is_active'
      );
      return { ...rel, grants };
    });

    entities.push({
      name: entityName,
      relations: relationsWithPerms,
      permissions
    });
  }

  // Filter out entities with no relations (like "user") for the resource dropdown
  // but keep them available as subject types
  return entities;
}

// ─── STATE ─────────────────────────────────────────────────────────────────

const entities = parseSchema(RAW_SCHEMA);
let state = {
  entityType: '',
  entityId: '',
  relation: null,
  subjectType: '',
  subjectId: ''
};

// ─── INIT ──────────────────────────────────────────────────────────────────

function init() {
  const select = document.getElementById('entitySelect');

  // Populate resource dropdown from parsed entities
  // Only show entities that HAVE relations (can be a resource)
  entities
    .filter(e => e.relations.length > 0)
    .forEach(e => {
      const opt = document.createElement('option');
      opt.value = e.name;
      opt.textContent = e.name;
      select.appendChild(opt);
    });
}

// ─── STEP 1: Entity selected ───────────────────────────────────────────────

function onEntityChange() {
  const val = document.getElementById('entitySelect').value;
  state.entityType = val;
  state.relation = null;
  state.subjectType = '';
  state.subjectId = '';

  // Reset downstream
  resetStep(2);
  resetStep(3);
  hidePreview();

  if (!val) return;

  // Find entity in parsed schema
  const entity = entities.find(e => e.name === val);
  if (!entity) return;

  // Unlock step 2 and render relation cards
  unlockStep(2);
  renderRelations(entity);
  updateStepBar(1, 'done');
  updateStepBar(2, 'active');
}

function onEntityIdChange() {
  state.entityId = document.getElementById('entityId').value;
  updatePreviewIfReady();
}

// ─── STEP 2: Render relations ──────────────────────────────────────────────

function renderRelations(entity) {
  const container = document.getElementById('relationContent');
  container.innerHTML = '';

  const grid = document.createElement('div');
  grid.className = 'relation-grid animate-in';

  entity.relations.forEach(rel => {
    const card = document.createElement('div');
    card.className = 'rel-card';
    card.id = `rel-${rel.name}`;
    card.onclick = () => onRelationSelect(rel, entity);

    // Permissions this relation appears in
    const permList = entity.permissions
      .filter(p => p.toLowerCase().includes(rel.name))
      .slice(0, 3);

    card.innerHTML = `
      <div class="rel-card-name">${rel.name}</div>
      <div class="rel-card-type">→ ${rel.type}</div>
      <div class="rel-card-perms">
        ${permList.map(p => `<div class="perm-item">${p}</div>`).join('')}
        ${permList.length === 0 ? `<div class="perm-item" style="color:#6b7280; font-style:italic;">linked resource</div>` : ''}
      </div>
    `;

    grid.appendChild(card);
  });

  container.appendChild(grid);
}

// ─── STEP 2: Relation selected ─────────────────────────────────────────────

function onRelationSelect(rel, entity) {
  // Deselect all cards
  document.querySelectorAll('.rel-card').forEach(c => c.classList.remove('selected'));
  document.getElementById(`rel-${rel.name}`).classList.add('selected');

  state.relation = rel;
  state.subjectType = rel.type;  // AUTO-FILLED from relation definition!
  state.subjectId = '';

  // Unlock step 3 and render subject input
  unlockStep(3);
  renderSubjectInput(rel);
  updateStepBar(2, 'done');
  updateStepBar(3, 'active');
  hidePreview();
}

// ─── STEP 3: Render subject input ─────────────────────────────────────────

function renderSubjectInput(rel) {
  const container = document.getElementById('subjectContent');

  container.innerHTML = `
    <div class="field-group animate-in">
      <div class="field">
        <label>Subject Type <span class="auto-badge">AUTO-FILLED</span></label>
        <input type="text" value="${rel.type}" disabled style="opacity:0.6; cursor:not-allowed;" />
        <div class="field-hint">Determined by the relation definition</div>
      </div>
      <div class="field">
        <label>Subject ID</label>
        <input
          type="text"
          id="subjectId"
          placeholder="e.g. user_alice"
          oninput="onSubjectIdChange()"
          autofocus
        />
        <div class="field-hint">The specific ${rel.type} ID</div>
      </div>
    </div>
  `;
}

function onSubjectIdChange() {
  state.subjectId = document.getElementById('subjectId').value;
  updatePreviewIfReady();
}

// ─── STEP 4: Preview ───────────────────────────────────────────────────────

function updatePreviewIfReady() {
  const { entityType, entityId, relation, subjectType, subjectId } = state;

  if (!entityType || !entityId || !relation || !subjectType || !subjectId) {
    hidePreview();
    return;
  }

  showPreview();
}

function showPreview() {
  const { entityType, entityId, relation, subjectType, subjectId } = state;

  const entityStr  = `${entityType}:${entityId}`;
  const relationStr = relation.name;
  const subjectStr  = `${subjectType}:${subjectId}`;
  const tupleStr    = `${entityStr}#${relationStr}@${subjectStr}`;

  // Visual parts
  document.getElementById('tv-entity').textContent   = entityStr;
  document.getElementById('tv-relation').textContent = relationStr;
  document.getElementById('tv-subject').textContent  = subjectStr;

  // Tuple string (colored)
  document.getElementById('tupleString').innerHTML = `
    <span class="ts-entity">${entityType}:${entityId}</span><span class="ts-sep1">#</span><span class="ts-relation">${relationStr}</span><span class="ts-sep2">@</span><span class="ts-subject">${subjectType}:${subjectId}</span>
  `;

  // Plain English
  document.getElementById('plainEnglish').innerHTML =
    `<strong>${subjectType} "${subjectId}"</strong> will have <strong>${relationStr}</strong> access on <strong>${entityType} "${entityId}"</strong>`;

  // JSON structure
  const tupleObj = {
    entity:   { type: entityType, id: entityId },
    relation: relationStr,
    subject:  { type: subjectType, id: subjectId }
  };
  document.getElementById('tupleJson').textContent = JSON.stringify(tupleObj, null, 2);

  const preview = document.getElementById('step4');
  if (!preview.classList.contains('visible')) {
    preview.classList.add('visible', 'animate-in');
  }

  updateStepBar(3, 'done');
  updateStepBar(4, 'active');
}

function hidePreview() {
  document.getElementById('step4').classList.remove('visible');
  updateStepBar(4, '');
  if (state.relation === null) updateStepBar(3, '');
}

// ─── HELPERS ───────────────────────────────────────────────────────────────

function unlockStep(num) {
  document.getElementById(`step${num}`).classList.remove('locked');
  document.getElementById(`step${num}`).classList.add('active-card');
}

function resetStep(num) {
  const card = document.getElementById(`step${num}`);
  card.classList.add('locked');
  card.classList.remove('active-card');
  const lockMessages = { 2: '🔒 Select a resource first', 3: '🔒 Select a relation first' };
  const contentId = num === 2 ? 'relationContent' : 'subjectContent';
  document.getElementById(contentId).innerHTML = `<div class="lock-msg">${lockMessages[num]}</div>`;
  updateStepBar(num, '');
}

function updateStepBar(num, status) {
  const circle = document.getElementById(`sc${num}`);
  const label  = document.getElementById(`sl${num}`);
  const connPrev = document.getElementById(`conn${num - 1}`);

  circle.className = 'step-circle';
  label.className  = 'step-label';

  if (status === 'active') {
    circle.classList.add('active');
    label.classList.add('active');
  } else if (status === 'done') {
    circle.classList.add('done');
    circle.textContent = '✓';
    label.classList.add('done');
    if (connPrev) connPrev.classList.add('done');
  } else {
    circle.textContent = `0${num}`;
  }
}

function resetForm() {
  state = { entityType: '', entityId: '', relation: null, subjectType: '', subjectId: '' };

  document.getElementById('entitySelect').value = '';
  document.getElementById('entityId').value = '';

  resetStep(2);
  resetStep(3);
  hidePreview();

  // Reset step bar
  [1,2,3,4].forEach(n => {
    const c = document.getElementById(`sc${n}`);
    const l = document.getElementById(`sl${n}`);
    c.className = 'step-circle';
    c.textContent = `0${n}`;
    l.className = 'step-label';
  });
  document.querySelectorAll('.step-connector').forEach(c => c.classList.remove('done'));
  document.getElementById('sc1').classList.add('active');
  document.getElementById('sl1').classList.add('active');

  document.getElementById('step1').classList.add('active-card');
}

function copyTuple() {
  const { entityType, entityId, relation, subjectType, subjectId } = state;
  const str = `${entityType}:${entityId}#${relation.name}@${subjectType}:${subjectId}`;
  navigator.clipboard.writeText(str).then(() => showToast('Tuple copied!'));
}

function createPolicy() {
  showToast('✓ Tuple created successfully');
}

function showToast(msg) {
  const t = document.getElementById('toast');
  t.textContent = msg;
  t.classList.add('show');
  setTimeout(() => t.classList.remove('show'), 3000);
}

// Init on load
init();
